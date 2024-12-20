import { useState } from 'react';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('Choose...');
    const [toCurrency, setToCurrency] = useState('Choose...');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [error, setError] = useState('');

    const convertCurrency = async () => {
        setError('');
        setConvertedAmount('');

        const amountValue = parseFloat(amount.trim());

        if (
            isNaN(amountValue) ||
            amountValue <= 0 ||
            fromCurrency === 'Choose...' ||
            toCurrency === 'Choose...'
        ) {
            setError('Please enter valid input value');
            return;
        }

        try {
            const response = await fetch(
                'https://api.currencyapi.com/v3/latest?apikey=cur_live_K8uFzO3UBsMZ3DMmANemOSZhkbW9gfmljxrCJidS'
            );
            const data = await response.json();

            const fromRate = data.data[fromCurrency].value;
            const toRate = data.data[toCurrency].value;

            const result = (amountValue * (toRate / fromRate)).toFixed(2);

            setConvertedAmount(`${amountValue} ${fromCurrency} = ${result} ${toCurrency}`);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('There was a problem with the fetch operation.');
        }
    };

    const reset = () => {
        setAmount('');
        setFromCurrency('Choose...');
        setToCurrency('Choose...');
        setConvertedAmount('');
        setError('');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center my-5">Currency Converter</h1>

            <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="currencyFrom" className="form-label">
                    From Currency
                </label>
                <select
                    id="currencyFrom"
                    className="form-select"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <option value="Choose...">Choose...</option>
                    <option value="MYR">MYR</option>
                    <option value="THB">THB</option>
                    <option value="CNY">CNY</option>
                    <option value="USD">USD</option>
                    <option value="HKD">HKD</option>
                    <option value="VND">VND</option>
                    <option value="INR">INR</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="currencyTo" className="form-label">
                    To Currency
                </label>
                <select
                    id="currencyTo"
                    className="form-select"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    <option value="Choose...">Choose...</option>
                    <option value="MYR">MYR</option>
                    <option value="THB">THB</option>
                    <option value="CNY">CNY</option>
                    <option value="USD">USD</option>
                    <option value="HKD">HKD</option>
                    <option value="VND">VND</option>
                    <option value="INR">INR</option>
                </select>
            </div>

            <div className="d-flex justify-content-between">
                <button className="btn btn-dark" onClick={convertCurrency}>
                    Convert
                </button>
                <button className="btn btn-secondary" onClick={reset}>
                    Reset
                </button>
            </div>

            {error && <p className="text-center text-danger mt-3">{error}</p>}

            {convertedAmount && (
                <h5 className="text-center text-success mt-3 fs-1">{convertedAmount}</h5>
            )}
        </div>
    );
}
