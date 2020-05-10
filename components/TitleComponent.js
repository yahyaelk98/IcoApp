import React from 'react';
import { StyleSheet, View, Text} from "react-native";
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ButtonBack navigation={this._navigation} />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 8 }}>
                    <Text style={styles.textHeader}>{I18n.t(this.titleName)}</Text>
                </View>
                <ThreeDotsMenu navigation={this._navigation} />
            </View>

        );
    }

}
export default TitleComponent;
//Constantes de tamano responsive
const MAX_SIZE = '100%';
const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';
const MINIMUN_MARGIN = '1%';
//Colors gradient constant
const GRADIENT_COLOR_A = '#e12406';
const GRADIENT_COLOR_B = '#f65511';
const GRADIENT_COLOR_C = '#ff8311';


const styles = StyleSheet.create({
    cardHeader: {
        padding: NORMAL_MARGIN, margin: BIG_MARGIN,
        marginBottom: MINIMUN_MARGIN, borderWidth: 6,
        borderColor: '#FFB36B'
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 24
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

