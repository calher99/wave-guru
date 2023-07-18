import axios from "axios";
import React, { memo, useCallback, useState, useMemo } from "react";

import { FlatList, View, StyleSheet, Text } from "react-native";
import { SearchBar } from "@rneui/themed";
import ListSpot from "./ListSpot";
import { SPOT_DATA } from "../../assets/data/spotData";

export const DropDownSearch = memo(() => {
  const [search, setSearch] = useState("");

  const handleUpdate = (search: string) => {
    setSearch(search);
  };

  const filteredResults = useMemo(() => {
    return SPOT_DATA.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Search..."
        onChangeText={(search) => {
          handleUpdate(search);
        }}
        containerStyle={{ padding: 0 }}
        inputContainerStyle={{ height: 24 }}
        inputStyle={{ fontSize: 14 }}
        cancelButtonProps={{
          buttonTextStyle: {
            fontSize: 14,
          },
        }}
        platform="ios"
        value={search}
      />

      {/* {!search && (
          <>
            <RecentlySearchedBreaks
              onPress={(item: Break) => handlePress(item)}
            />
            <NearbyBreaks
              locations={getBreaks()}
              currentLocation={user?.location}
              onPress={(item: Break) => handlePress(item)}
            />
          </>
        )} */}
      {search && (
        <>
          <View style={styles.searchResultsContainer}>
            {filteredResults.length > 0 ? (
              <FlatList
                initialNumToRender={8}
                data={search !== "" ? filteredResults : []}
                renderItem={({ item }) => {
                  return (
                    <ListSpot
                      place={item}
                      //   search={search}
                      //   onPress={(item) => {
                      //     if (user) {
                      //       updateRecentlySearchedBreaks(user, item);
                      //     }
                      //     handlePress(item);
                      //   }}
                    />
                  );
                }}
                keyExtractor={(item) => item.data.toString()}
              />
            ) : (
              <View style={styles.noResult}>
                <Text
                  style={styles.noResulText}
                >{`No results for ${search}`}</Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  searchResultsContainer: {},
  noResult: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  noResulText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
