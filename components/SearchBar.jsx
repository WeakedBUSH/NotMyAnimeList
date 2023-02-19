import React, { useState } from 'react';
import { TextInput, View, FlatList,} from 'react-native';

const SearchBar = ({ data, renderItem }) => {
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.english.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      <TextInput
        placeholder="Rechercher un anime"
        onChangeText={handleSearch}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResults && (

        <FlatList
          data={filteredData}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default SearchBar;