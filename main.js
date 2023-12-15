const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let productsData = []; 


const fetchProducts = async () => {
    const res = await fetch('./product.json');
    productsData = await res.json();
};


const searchWithinCategory = (category, searchText) => {
    const regex = new RegExp(searchText, 'gi');
    return productsData.filter(product => {
        return (
            product.category.toLowerCase() === category.toLowerCase() &&
            (product.name.match(regex) || product.description.match(regex))
        );
    });
};


const displayResults = matches => {
    if (matches.length > 0) {
        const html = matches
            .map(match => `
                <div class="card card-body mb-1">
                    <h4>${match.name}</h4>
                    <p>${match.description}</p>
                </div>
            `)
            .join('');
        matchList.innerHTML = html;
    } else {
        matchList.innerHTML = '<p>No matches found.</p>';
    }
};


const handleSearch = () => {
    const searchText = search.value.trim();

    if (searchText !== '') {
        const womenMatches = searchWithinCategory("women's clothing", searchText);
        const menMatches = searchWithinCategory("men's clothing", searchText);
        const electronicsMatches = searchWithinCategory("electronics", searchText);
        const jewelryMatches = searchWithinCategory("jewelery", searchText);

        const combinedMatches = [...womenMatches, ...menMatches, ...electronicsMatches, ...jewelryMatches];

        displayResults(combinedMatches);
    } else {
        matchList.innerHTML = '';
    }
};


search.addEventListener('input', handleSearch);


fetchProducts();

