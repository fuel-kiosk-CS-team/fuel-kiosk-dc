'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { FuelTypeSelector } from '../../components/fuelselector/FuelTypeSelector';
import { TotalizerVerification } from '../../components/totalizer/TotalizerVerification';
import { FuelEntryForm } from '../../components/fuelentry/FuelEntryForm';

export default function FuelSitePage({ params: paramsPromise }) {
    const router = useRouter();
    const params = use(paramsPromise);
    const { siteId } = params;
    
    const [step, setStep] = useState('SELECT_FUEL');
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [totalizerValue, setTotalizerValue] = useState('0.3');
    const [siteInfo, setSiteInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                console.log('Fetching for siteId:', siteId);
                const response = await fetch('/api/sites');
                const sites = await response.json();
                console.log('Sites from API:', sites);
                
                const site = sites.find(s => s.value === siteId);
                console.log('Found site:', site);

                if (!site) {
                    setError('Site not found');
                } else if (site.route) {
                    router.push(site.route);
                } else {
                    setSiteInfo(site);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error loading site information');
            } finally {
                setLoading(false);
            }
        };

        fetchSiteInfo();
    }, [siteId, router]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-4">
                <h2 className="text-red-500">Error: {error}</h2>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Debug Information:</h3>
                    <p>Requested Site ID: {siteId}</p>
                </div>
                <button 
                    onClick={() => router.push('/')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            {siteInfo ? (
                <>
                    <h1 className="text-2xl font-bold mb-6">{siteInfo.label}</h1>
                    
                    {step === 'SELECT_FUEL' && (
                        <div className="space-y-4">
                            <h2 className="text-xl">Select Fuel Type</h2>
                            <FuelTypeSelector
                                onSelect={(fuelType) => {
                                    setSelectedFuelType(fuelType);
                                    setStep('VERIFY_TOTALIZER');
                                }}
                                selectedType={selectedFuelType}
                            />
                        </div>
                    )}
                    
                    {step === 'VERIFY_TOTALIZER' && (
                        <div className="space-y-4">
                            <h2 className="text-xl">Verify Totalizer Reading</h2>
                            <TotalizerVerification
                                value={totalizerValue}
                                onVerify={(verified) => {
                                    if (verified) {
                                        setStep('ENTRY_FORM');
                                    } else {
                                        alert('Please contact administrator for assistance');
                                    }
                                }}
                                onBack={() => setStep('SELECT_FUEL')}
                            />
                        </div>
                    )}
                    
                    {step === 'ENTRY_FORM' && (
                        <div className="space-y-4">
                            <h2 className="text-xl">Fuel Site Entry Log</h2>
                            <FuelEntryForm
                                siteInfo={siteInfo}
                                initialValues={{
                                    totalizerStart: totalizerValue,
                                    fuelType: selectedFuelType,
                                }}
                                onSubmit={(data) => {
                                    console.log('Form submitted:', data);
                                    setStep('SELECT_FUEL');
                                    setSelectedFuelType(null);
                                }}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div>Site information not available</div>
            )}
        </div>
    );
}