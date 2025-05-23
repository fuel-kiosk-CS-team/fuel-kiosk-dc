import { useState, useEffect, useContext } from "react";
import { Button, ActionIcon } from "@mantine/core";
import { FuelFlowProvider, FuelFlowContext } from "../../context/FuelFlowProvider";

// Component to monitor and display real-time fuel flow status
export function FuelFlowStatus({loc_code, site_email_addr}) {
    // Get socket and timeout from context
    const { socket, timeoutID } = useContext(FuelFlowContext);
    const [socketValue, setSocketValue] = socket;
    const [timeoutIDValue, setTimeoutIDValue] = timeoutID;

    // Track flow state and start time
    const [flowState, setFlowState] = useState(0);
    const [flowStartTimestamp, setFlowStartTimestamp] = useState(0);

    // Calculate lookback period for transaction verification
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

    // Set up socket listener for flow state changes
    useEffect(() => {
        if (!socketValue) return;
        console.log("Socket connected");
        console.log(loc_code);

        socketValue.on("sendFlowState", (newFlowState) => {
            console.log(`FLOW STATE: ${JSON.stringify(newFlowState)}`);
            
            // When flow starts, set up monitoring
            if ((flowState == 0) && (newFlowState['data'] == 1)) {
                setFlowStartTimestamp(Date.now());
                console.log(`FLOW START TIMESTAMP: ${flowStartTimestamp}`);

                // Set timeout to check for transaction after delay
                setTimeoutIDValue(setTimeout(async () => {
                    const currentTimestamp = Date.now();
                    const { startDate, endDate, lookbackTimestamp } = getLookbackDatetime(currentTimestamp);

                    if (loc_code) {
                        // Query recent transactions
                        const queryString = `/api/transactions?loc_code=${loc_code}&start=${startDate}&end=${endDate}`;
                        console.log(`FUEL FLOW QUERY: ${queryString}`);
                        let results = null;

                        try {
                            const response = await fetch(queryString);
                            results = await response.json();
                            // Filter for transactions within lookback period
                            let recentLogs = results.filter((log, index) => {
                                const logTimestamp = new Date(log['datetime_Insert']).getTime()
                                return (logTimestamp > lookbackTimestamp) 
                            })
                            console.log(recentLogs);

                            // Send alert if no transaction found
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
                }, 5000));  // Check after 5 seconds
            }
            setFlowState(newFlowState['data']);
        });

        return () => {
            socketValue.off("sendFlowState");
        };

    }, [socketValue]);

    // Render fuel flow status indicator
    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ActionIcon style={{ height: "100%", width: "100%" }} radius="md" variant="light" color="rgb(201, 201, 201)">
                <p style={{ fontSize: "20pt" }}>Fuel Flow {(flowState === 1) ? "On" : "Off"}</p>
            </ActionIcon>
        </div>
    )
}