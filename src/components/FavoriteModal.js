import React from 'react';
import { 
    Modal, 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    FlatList
} from 'react-native';

import Repo from './Repo';

const FavoriteModal = ({ visible, onRequestClose, repos }) => {
    const renderRepos = ({ item }) => {
        return (
            <Repo 
            info={item} />
        );
    };

    return (
        <Modal
        animationType="none"
        transparent={false}
        visible={visible}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onRequestClose}>
                        <View style={styles.button}>
                            <Text style={styles.menu}>Voltar ›</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Favoritos</Text>
                </View>
                <FlatList
                data={repos}
                renderItem={renderRepos}
                keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 40
    },
    container: {
        backgroundColor: '#333',
        flex: 1
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '600'
    },
    menu: {
        color: '#FFF',
        marginTop: 8,
        marginBottom: 8,
        fontSize: 16
    },
    header: {
        marginLeft: 16
    }
});

export default FavoriteModal;