import { useState, useEffect, useContext } from "react";
import { Button, ActionIcon } from "@mantine/core";
import { FuelFlowProvider, FuelFlowContext } from "../../context/FuelFlowProvider";

export function FuelFlowStatus({loc_code, site_email_addr}) {

    const { socket, timeoutID } = useContext(FuelFlowContext);
    const [socketValue, setSocketValue] = socket;
    const [timeoutIDValue, setTimeoutIDValue] = timeoutID;

    //const socket = useSocket();
    const [flowState, setFlowState] = useState(0);
    const [flowStartTimestamp, setFlowStartTimestamp] = useState(0);

    function getLookbackDatetime(currentTimestamp) {
        let lookbackTimestamp = currentTimestamp - 15000//480000;          //8min lookback in ms
        let lookbackDateStart = new Date(lookbackTimestamp);
        //let lookbackDateStart = new Date(lookbackTimestamp - 86400000);         //+ 1 day bc of quirky filter
        let lookbackDateEnd = new Date(lookbackTimestamp + 86400000);
        const formattedLookbackDateStart = lookbackDateStart.toISOString().split('T')[0];
        const formattedLookbackDateEnd = lookbackDateEnd.toISOString().split('T')[0];

        return {
            startDate: formattedLookbackDateStart,
            endDate: formattedLookbackDateEnd,
            lookbackTimestamp: lookbackTimestamp
        }
    }

    useEffect(() => {
        if (!socketValue) return;
        console.log("Socket connected");
        console.log(loc_code);

        socketValue.on("sendFlowState", (newFlowState) => {
            console.log(`FLOW STATE: ${JSON.stringify(newFlowState)}`);
            
            if ((flowState == 0) && (newFlowState['data'] == 1)) {
                setFlowStartTimestamp(Date.now());
                console.log(`FLOW START TIMESTAMP: ${flowStartTimestamp}`);
                setTimeoutIDValue(setTimeout(async () => {
                    const currentTimestamp = Date.now();
                    const { startDate, endDate, lookbackTimestamp } = getLookbackDatetime(currentTimestamp);
                    if (loc_code) {
                        const queryString = `/api/transactions?loc_code=${loc_code}&start=${startDate}&end=${endDate}`;
                        console.log(`FUEL FLOW QUERY: ${queryString}`);
                        let results = null;
                        try {
                            const response = await fetch(queryString);
                            results = await response.json();
                            let recentLogs = results.filter((log, index) => {
                                const logTimestamp = new Date(log['datetime_Insert']).getTime()
                                return (logTimestamp > lookbackTimestamp) 
                            })
                            console.log(recentLogs);
                            if (!recentLogs || recentLogs.length === 0) {
                                const emailData = {
                                    to: site_email_addr,
                                    data: {
                                        fuel_site: loc_code,
                                        timestamp: currentTimestamp,
                                    },
                                }

                                await fetch('/api/email/fuelflowerror', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(emailData)
                                });
                                console.log(`Fuel flow - No ticket`);
                            }
                        } catch (error) {
                            console.error("Error fetching logs:", error);
                        }
                        console.log(JSON.stringify(results));
                    }
                }, 5000));                  // Timer in ms
            }
            setFlowState(newFlowState['data']);
        });

        return () => {
            socketValue.off("sendFlowState");
        };

    }, [socketValue]);

    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ActionIcon style={{ height: "100%", width: "100%" }} radius="md" variant="light" color="rgb(201, 201, 201)">
                <p style={{ fontSize: "20pt" }}>Fuel Flow {(flowState === 1) ? "On" : "Off"}</p>
            </ActionIcon>
        </div>
    )
}