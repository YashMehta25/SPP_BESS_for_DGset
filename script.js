document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const eta = parseFloat(document.getElementById('eta').value);
    const F = parseFloat(document.getElementById('F').value);
    const alpha = parseFloat(document.getElementById('alpha').value);
    const dy = parseFloat(document.getElementById('dy').value);
    const K = parseFloat(document.getElementById('K').value);
    const Rg = parseFloat(document.getElementById('Rg').value);
    const Rd = parseFloat(document.getElementById('Rd').value);
    const Tauo = parseFloat(document.getElementById('Tauo').value);
    const No = parseFloat(document.getElementById('No').value);
    const P_L = parseFloat(document.getElementById('P_L').value);

    // Calculate initial investment
    const initialInvestment = F * K * P_L;

    // Calculate annual savings
    function calculateAnnualSavings() {
        // Example calculation; replace this with your actual formula
        const outageHoursPerYear = Tauo * No * dy;
        const gridSavings = outageHoursPerYear * P_L * (Rd - Rg/((1 - alpha)*eta));
        return gridSavings;
    }

    // Calculate cumulative savings up to a given year
    function calculateCumulativeSavings(upToYear) {
        const annualSavings = calculateAnnualSavings();
        let cumulativeSavings = 0;
        for (let year = 1; year <= upToYear; year++) {
            cumulativeSavings += annualSavings;
        }
        return cumulativeSavings;
    }

    // Data arrays
    const years = [];
    const investments = [];
    const savings = [];

    // Generate data for 20 years
    for (let year = 0; year <= 30; year++) {
        years.push(year);
        investments.push(initialInvestment);
        savings.push(calculateCumulativeSavings(year));
    }

    // Plot data using Plotly
    const trace1 = {
        x: years,
        y: investments,
        type: 'scatter',
        mode: 'lines',
        name: 'Initial Investment',
        line: { color: 'red' }
    };

    const trace2 = {
        x: years,
        y: savings,
        type: 'scatter',
        mode: 'lines',
        name: 'Cumulative Annual Savings',
        line: { color: 'green' }
    };

    const data = [trace1, trace2];

    const layout = {
        title: 'Initial Investment vs Cumulative Annual Savings',
        xaxis: {
            title: 'Years'
        },
        yaxis: {
            title: 'Amount ($)'
        }
    };

    Plotly.newPlot('plot', data, layout);

    // Find intersection point (SPP)
    for (let i = 0; i < years.length; i++) {
        if (savings[i] >= investments[i]) {
            alert(`Simple Payback Period (SPP) is ${years[i]} years`);
            break;
        }
    }
});
