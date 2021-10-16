export function imageStyle() {
	const imageElement = document.getElementById(`image`);
	imageElement.classList.add('border', 'border-2', 'border-dark');
}

export function searchBar() {
	const search = document.getElementById('search-input');
	search.style.textOverflow = 'ellipsis';
	search.style.width = '13em';
}
