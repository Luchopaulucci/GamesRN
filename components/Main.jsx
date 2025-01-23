import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Button,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";

const GAMES_URL = "https://www.cheapshark.com/api/1.0/deals?storeID=";

export function Main() {
  const [isLoading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchGames(page)
  }, [page]);

  const fetchGames = async (page) => {
    setLoading(true);
    fetch(`${GAMES_URL}${page}`)
      .then((response) => response.json())
      .then((json) => setGames(json))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
        <FlatList 
        data={games}
        keyExtractor={item => item.dealID}
        renderItem={({item}) => <AnimatedGameCard game={item} />}
        />
        <View style={styles.pagination}>
            <Button title="Anterior" onPress={handlePrevPage} disabled={page === 1} />
            <Text style={styles.pageText}>Página {page}</Text>
            <Button title="Siguiente" onPress={handleNextPage} />
          </View>
        </>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#333",
  },
});
