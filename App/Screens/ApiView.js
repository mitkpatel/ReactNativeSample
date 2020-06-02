import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import styles from './ApiStyles';
const ApiView = (props) => {
    const { goForFetch, goForAxios, fromFetch, fromAxios, axiosData, renderItem, FlatListItemSeparator, dataSource, loading } = props
    return (
        <View style={styles.parentContainer}>
            <View>
                <Text style={styles.textStyle}>Activtiy for Testing odoo Connectivtiy</Text>
            </View>
            <View style={{ margin: 18 , alignContent: "center", alignItems: "center"}}>
                <Button
                    title={'Click here to check connectivity'}
                    onPress={goForFetch}
                    color='green'
                />
            </View>


            {fromFetch ?
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                /> : <FlatList
                    data={axiosData}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            }
            {loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                    <Text style={{fontSize:16,color:'red'}}>Loading Data...</Text>
                </View>
            }
        </View>
    )
}
export default ApiView;