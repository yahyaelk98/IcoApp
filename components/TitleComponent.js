import React from 'react';
import { StyleSheet, View, Text,Dimensions} from "react-native";
import ThreeDotsMenu from "../components/ThreeDotsMenu";
import ButtonBack from "./ButtonBack";
import I18n from '../idiomas/idioma';


class TitleComponent extends React.Component {
    _navigation;
    titleName;

    render() {
        this._navigation = this.props.navigation;
        this.titleName = this.props.titleName;
        return (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' , height: 30}}>
                <ButtonBack navigation={this._navigation} />
                <View style={{  alignItems: 'center', flex: 8 }}>
                    <Text style={styles.textHeader}>{this.titleName}</Text>
                </View>
                <ThreeDotsMenu navigation={this._navigation}  />
            </View>

        );
    }

}
export default TitleComponent;
//Constantes de tamano responsive
const { width, height } = Dimensions.get('window');
const MAX_SIZE = '100%';
const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';
const MINIMUN_MARGIN = '1%';

const TEXT_PROFILE_WIDTH = width * 0.3;



const styles = StyleSheet.create({
    cardHeader: {
        margin: BIG_MARGIN,
        marginBottom: MINIMUN_MARGIN, 
        borderWidth: 1,
        paddingTop: NORMAL_MARGIN, 
        borderColor: '#FFB36B'
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 24,
        borderColor: '#FFF',
    },
    linearGradient: {
        width: MAX_SIZE,
        height: MAX_SIZE
    },
    cardIdiomas: {
        padding: NORMAL_MARGIN, margin: NORMAL_MARGIN,
        marginBottom: MINIMUN_MARGIN
    }
});

