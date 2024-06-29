export const style = `
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: white;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .time-container {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
    }

    .hourglass-container {
        margin-right: 4px;
    }

    table {
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-collapse: collapse;
    }

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f7f300;
        font-weight: bold;
    }

    td {
        background-color: #fafafa;
    }

    tr:hover td {
        background-color: #f1f1f1;
    }
</style>
`;
