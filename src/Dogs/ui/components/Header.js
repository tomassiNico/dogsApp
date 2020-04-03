import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';

const Header = props => (
    <View>
        <SafeAreaView>
            <View style={styles.container}>
                <Image 
                    source={{uri: 'https://images.squarespace-cdn.com/content/v1/55b00b8fe4b00e86e56c1196/1509671565625-65EP7EK5WKT0S20GVQWW/ke17ZwdGBToddI8pDm48kNnXr6aOSeKpN_pOojTpHsR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0p4Wyba38KfG317vYluk4592i8kx2SaGcLuKyt-_2YxHwtR8tefOfaiuQm2Q2uBM6Q/Mascot+Images+of+Project+dog4.jpg'}}
                    style={styles.logo}
                />
                <View style={styles.right}>
                    {props.children}
                </View>
            </View>
        </SafeAreaView>
    </View>   
)

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 70,
        resizeMode: 'contain'
    },
    container: {
        padding: 5,
        flexDirection: 'row'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

export default Header;