
 // Fetch data using .then
 fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
 .then(response => response.json())
 .then(data => {
   renderTable(data);
 })
 .catch(error => console.log(error));

// Fetch data using async/await
async function fetchData() {
 try {
   const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
   const data = await response.json();
   renderTable(data);
 } catch (error) {
   console.log(error);
 }
}

// Render the data in the table
function renderTable(data) {
 const table = document.getElementById('coinTable');
 table.innerHTML = `
   <tr>
     <th>Image</th>
     <th>Name</th>
     <th>Symbol</th>
     <th>Price</th>
     <th>Percentage</th>
     <th>Volume</th>
   </tr>
 `;
 
 data.forEach(coin => {
   const row = document.createElement('tr');
   row.innerHTML = `
     <td><img src="${coin.image}" alt="${coin.name}" width="40"></td>  
     <td>${coin.name}</td>
     <td>${coin.symbol}</td>
     <td>${coin.current_price}</td>
     <td>${coin.atl_change_percentage}</td>
     <td>${coin.total_volume}</td>
   `;
   table.appendChild(row);
 });
}

// Filter the table based on search input
function filterTable() {
 const input = document.getElementById('searchInput');
 const filter = input.value.toUpperCase();
 const table = document.getElementById('coinTable');
 const rows = table.getElementsByTagName('tr');

 for (let i = 1; i < rows.length; i++) {
   const name = rows[i].getElementsByTagName('td')[0];
   if (name) {
     const textValue = name.textContent || name.innerText;
     if (textValue.toUpperCase().indexOf(filter) > -1) {
       rows[i].style.display = '';
     } else {
       rows[i].style.display = 'none';
     }
   }
 }
}

// Sort the table by market cap
function sortTableByMarketCap() {
 const table = document.getElementById('coinTable');
 const rows = Array.from(table.getElementsByTagName('tr'));
 
 rows.shift(); // Remove table header row

 rows.sort((a, b) => {
   const aValue = parseFloat(a.getElementsByTagName('td')[5].innerText);
   const bValue = parseFloat(b.getElementsByTagName('td')[5].innerText);
   return bValue - aValue;
 });

 table.innerHTML = '';
 table.appendChild(rows[0]); // Append table header row

 rows.forEach(row => {
   table.appendChild(row);
 });
}

// Sort the table by percentage change
function sortTableByPercentageChange() {
 const table = document.getElementById('coinTable');
 const rows = Array.from(table.getElementsByTagName('tr'));
 
 rows.shift(); // Remove table header row

 rows.sort((a, b) => {
   const aValue = parseFloat(a.getElementsByTagName('td')[4].innerText.replace('%', ''));
   const bValue = parseFloat(b.getElementsByTagName('td')[4].innerText.replace('%', ''));
   return bValue - aValue;
 });

 table.innerHTML = '';
 table.appendChild(rows[0]); // Append table header row

 rows.forEach(row => {
   table.appendChild(row);
 });
}
