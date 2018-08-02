// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';
import { Jiro } from 'react-native-textinput-effects';

import { colors } from '../../common/ui';

type Props = {
  style?: Object,
  item: FoodItemData | DayFoodItemData,
  isEditMode: boolean,
  componentId: string,
};

type State = {
  name: string,
  protein: string,
  fat: string,
  carbohydrate: string,
  weight: string,
};

@inject('foodsStore')
@observer
export default class EditFoodItem extends React.Component<Props, State> {
  state = {
    name: this.props.item.name,
    protein: `${this.props.item.protein}`,
    fat: `${this.props.item.fat}`,
    carbohydrate: `${this.props.item.carbohydrate}`,
    weight: '',
  };

  componentDidMount() {
    const { item } = this.props;
    const titleText = item.name.length >= 20
      ? `${item.name.substr(0, 17)}...` : item.name;

    Navigation.mergeOptions(this.props.componentId, {
      topBar: { title: { text: titleText } },
    });
  }

  onAddPress = () => {
    const { name, protein, fat, carbohydrate, weight } = this.state;
    if (name === '' || protein === '' || fat === '' || carbohydrate === ''
      || weight === '') {
      return;
    }

    this.props.foodsStore.addNewDayFoodItem({
      name,
      protein,
      fat,
      carbohydrate,
      weight,
      added_at: new Date(),
    });
    Navigation.pop(this.props.componentId);
  };

  renderInputs() {
    const { isEditMode } = this.props;
    const { name, protein, fat, carbohydrate, weight } = this.state;

    return (
      <View>
        {isEditMode && (
          <Jiro
            style={styles.inputCont}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            label="Name"
            borderColor={colors.weight}
            value={name}
            onChangeText={text => this.setState({ name: text })}
          />
        )}

        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Protein"
          borderColor={colors.protein}
          value={protein}
          editable={isEditMode}
          onChangeText={text => this.setState({ protein: text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Fat"
          borderColor={colors.fat}
          value={fat}
          editable={isEditMode}
          onChangeText={text => this.setState({ fat: text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Carbohydrate"
          borderColor={colors.carb}
          value={carbohydrate}
          editable={isEditMode}
          onChangeText={text => this.setState({ carbohydrate: text })}
        />
        {!isEditMode && (
          <Jiro
            style={styles.inputCont}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            label="Weight"
            borderColor={colors.weight}
            value={weight}
            onChangeText={text => this.setState({ weight: text })}
          />
        )}
      </View>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderInputs()}

        <TouchableOpacity
          style={styles.btn}
          title="Adddd"
          color={colors.white}
          onPress={this.onAddPress}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },

  inputCont: {
    marginBottom: 8,
    width: '100%',
  },

  input: {
    color: colors.white,
  },

  inputLabel: {
    fontSize: 16,
  },

  btn: {
    backgroundColor: colors.mainDark,
    width: 90,
    height: 45,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },

  btnText: {
    fontSize: 20,
    color: colors.white,
  },
});
