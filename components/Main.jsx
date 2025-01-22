import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
/* import { getGames } from "../lib/games"; */

const GAMES_URL = "https://www.cheapshark.com/api/1.0/deals?storeID=1";

export function Main() {
  const [isLoading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetch(GAMES_URL)
      .then((response) => response.json())
      .then((json) => setGames(json))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView>
          {games.map((game) => (
            <View
              key={game.dealID}
              style={[
                styles.card,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
              ]}
            >
              <Text style={styles.title}>{game.title}</Text>
              <Image
                source={{ uri: game.thumb }}
                style={[styles.image, { resizeMode: "contain" }]}
              />
              <Text style={styles.score}>{game.metacriticScore}</Text>
              <Text style={styles.rating}>
                Reseñas en Steam: {game.steamRatingText}
              </Text>
              <Text style={styles.salePrice}>
                Precio Actual: ${game.salePrice}
              </Text>
              <Text style={styles.normalPrice}>
                Precio Normal: ${game.normalPrice}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 25,
    color: "#eee",
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  rating: {
    fontSize: 16,
    color: "#eee",
  },
  salePrice: {
    fontSize: 18,
    color: "green",
  },
  normalPrice: {
    fontSize: 18,
    color: "#fff",
  },
});
