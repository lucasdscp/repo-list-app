import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Repo = ({ info, isFavorite, onFavorite }) => {
    const favoriteIcon = isFavorite
    ? require('../images/heart-full-icon.png')
    : require('../images/heart-icon.png');

    return (
        <View style={styles.container}>
            <Image 
            source={{ uri: info.owner.avatar_url }}
            style={styles.thumbnail} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{info.name}</Text>
                <View style={styles.count}>
                    <View style={styles.countItem}>
                        <Image
                        source={require('../images/star-icon.png')}
                        style={styles.starIcon} />
                        <Text style={styles.countText}>{info.stargazers_count}</Text>
                    </View>
                    <View style={styles.countItem}>
                        <Image
                        source={require('../images/fork-icon.png')}
                        style={styles.icon} />
                        <Text style={styles.countText}>{info.forks_count}</Text>
                    </View>
                </View>
            </View>
            {onFavorite && <TouchableOpacity
            onPress={onFavorite}>
                <Image
                source={favoriteIcon}
                style={styles.favoriteButton} />
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        marginBottom: 0,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 8,
        width: 'auto'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 8
    },
    starIcon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    count: {
        display: 'flex',
        flexDirection: 'row'
    },
    countItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    countText: {
        color: '#FFF',
        fontSize: 16
    },
    favoriteButton: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default Repo;