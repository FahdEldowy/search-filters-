const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


const searchProducts = async searchText => {
    const res = await fetch('./product.json');
    const products = await res.json();

   
    let matches = products.filter(product => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return product.name.match(regex) || product.description.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};


const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches
            .map(match => `
                
                    <h4>${match.name}</h4>
                    <p>${match.description}</p>
                </div>
            `)
            .join('');
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchProducts(search.value));
