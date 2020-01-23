const container = document.getElementById('container');

const apiKey = 'BAE785958892B94C686483168';
const arrivals = 2;
const minutes = 60;
const locIDs = [10770].join();

const url = 'https://developer.trimet.org/ws/V2/arrivals?locIDs=' + locIDs + '&json=true&arrivals=' + arrivals + '&minutes=' + minutes + '&appID=' + apiKey;
console.log(url);


fetch(url)
    .then(function(results) {
        return results.json();
    }
        .then(
            data => {
                for (let i = 0; i < data.resultSet.arrival.length; i++) {
                    let key;
                    let value;
                    
                    // create new list and append to container
                    const ul = document.createElement('ul');
                    container.appendChild(ul);

                    for (let j = 0; j < Object.keys(data.resultSet.arrival[i]).length; j++) {
                        const li = document.createElement('li');

                        // store key: value for easy use
                        key = Object.keys(data.resultSet.arrival[i])[j];
                        value = data.resultSet.arrival[i][key];

                        // conditionally set li text to format certain values
                        if (key === 'scheduled' || key === 'estimated') {
                            li.textContent = (key) + ': ' + timeConverter(value);
                            ul.appendChild(li);
                        } else if (key === 'shortSign') {
                            ul.textContent = value;
                        } else {
                            li.textContent = (key) + ': ' + value;
                            ul.appendChild(li);
                        }
                        
                    }
                }
            }
        )
    );

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

