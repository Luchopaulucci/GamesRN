import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Animated } from "react-native";

export function GameCard({ game }) {
  return (
    <View key={game.dealID} style={styles.card}>
      <Text style={styles.title}>{game.title}</Text>
      <Image
        source={{ uri: game.thumb }}
        style={[styles.image, { resizeMode: "contain" }]}
      />
      <Text style={styles.score}>{game.metacriticScore}</Text>
      <Text style={styles.rating}>
        Reseñas en Steam: {game.steamRatingText}
      </Text>
      <Text style={styles.salePrice}>Precio Actual: ${game.salePrice}</Text>
      <Text style={styles.normalPrice}>Precio Normal: ${game.normalPrice}</Text>
    </View>
  );
}

export function AnimatedGameCard({ game }) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: 250,
        useNativeDriver: true,
      }).start();
    }, [opacity])
    
    return (
        <Animated.View style={{ opacity }}>
            <GameCard game={game} />
        </Animated.View>
    )
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
