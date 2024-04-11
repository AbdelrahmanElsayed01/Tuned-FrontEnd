// SearchTextBox.jsx
import React from 'react';
import styles from "./SearchTextBox.module.css";

function SearchTextBox({ searchQuery, setSearchQuery, searchType, setSearchType }) {
    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by title,artist or album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchTextBox;


