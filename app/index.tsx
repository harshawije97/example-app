import { Link } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SpritesDefault = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

type Pokemon = {
  id: number;
  name: string;
  height: number;
  abilities: any[];
  past_abilities: any[];
  sprites: SpritesDefault;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 86,
    height: 80,
  },
});

export default function Index() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10",
        );
        const { results } = await response.json();

        // destrcture and get more data
        const data = await Promise.all(
          results.map(async (pokemon: any) => {
            const response = await fetch(pokemon.url);
            const result = await response.json();
            return result;
          }),
        );

        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <ScrollView
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
      }}
    >
      {pokemon.map((pokemon) => {
        return (
          <Pressable key={pokemon.id}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: "#b7efe4",
              }}
              key={pokemon.id}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Image
                  style={styles.logo}
                  source={{ uri: pokemon.sprites.front_default }}
                />
                <Image
                  style={styles.logo}
                  source={{ uri: pokemon.sprites.back_default }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Link
                  href={{
                    pathname: "/details",
                    params: { name: pokemon.name },
                  }}
                >
                  <Text
                    style={{
                      color: "#00d3f3",
                      fontWeight: "500",
                      fontSize: 20,
                    }}
                  >
                    {pokemon.name}
                  </Text>
                </Link>
                <Text
                  style={{ color: "black", fontWeight: "500", fontSize: 15 }}
                >
                  {pokemon.height}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
