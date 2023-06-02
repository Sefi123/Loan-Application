import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { View, Image } from "native-base";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

type dataType = { uri: any };

const PAGE_WIDTH = Dimensions.get("window").width;
const DashboardCarousel = () => {
  const [data, setData] = React.useState<dataType[]>([
    { uri: require("../assets/images/blackfam1.jpg") },
    { uri: require("../assets/images/blackfam3.webp") },
    { uri: require("../assets/images/blackfam2.jpg") },
  ]);

  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    // vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  return (
    <Carousel
      {...baseOptions}
      loop
      ref={ref}
      style={{ width: "100%" }}
      autoPlay={true}
      autoPlayInterval={2000}
      data={data}
      // pagingEnabled={isPagingEnabled}
      //onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ index, item }) => (
        <View style={{ flex: 1, marginLeft: "2.5%" }}>
          <Image
            key={index}
            source={item.uri}
            alt=""
            // marginLeft="2.7%"
            borderRadius="2xl"
            style={styles.image}
            //ml="2.7%"
          />
        </View>
      )}
    />
  );
};

export default DashboardCarousel;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    //height: "100%",
    width: "100%",
    resizeMode: "stretch",
    //  borderRadius: 10,
    //height: "70%",
    alignSelf: "center",
  },
});
