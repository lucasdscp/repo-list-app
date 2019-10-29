import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';

import { toggleFavorite, setFavorites } from '../actions/RepoActions';
import Repo from '../components/Repo';
import FavoriteModal from '../components/FavoriteModal';

class Home extends Component {
    state = { 
        repos: [],
        isLoading: false,
        isSettingFavorite: false,
        modalVisible: false
    };

    setModalVisible = isVisible => {
        this.setState({ modalVisible: isVisible });
    }

    componentDidMount() {
        this.getRepos();
    }

    getRepos = () => {
        this.setState({ isLoading: true });

        axios.get('https://api.github.com/users/facebook/repos')
        .then(async response => {
            const { data } = response;
            
            if (data && data.length) {
                try {
                    await this.getFavorites();
                    this.setState({ repos: data, isLoading: true });
                } catch(err) {
                    this.setState({ isLoading: false });
                }
            }
        });
    }

    getFavorites = () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/favorites')
            .then(response => {
                const { data } = response;
                
                if (data && data.length) {
                    this.props.setFavorites(data);
                }

                resolve();
            })
            .catch(() => {
                reject();
            });
        });
    }

    isFavorite = (repo) => {
        const { repos } = this.props;
        return repos.favorites.findIndex(item => item.id === repo.id) > -1;
    }

    renderRepos = ({ item }) => {
        const isFavorite = this.isFavorite(item);
        return (
            <Repo 
            info={item}
            isFavorite={isFavorite}
            onFavorite={this.toggleFavorite.bind(this, item, isFavorite)} />
        );
    }

    toggleFavorite = (repo, isFavorite) => {
        const { isSettingFavorite } = this.state;
        const { toggleFavorite } = this.props;
        
        if (!isSettingFavorite) {
            this.setState({ isSettingFavorite: true });
            toggleFavorite(repo);
    
            if (isFavorite) {
                axios.delete(`http://localhost:3000/favorites/${repo.id}`)
                .then(() => {
                    this.setState({ isSettingFavorite: false });
                })
                .catch(() => {
                    toggleFavorite(repo);
                    this.setState({ isSettingFavorite: false });
                });
            } else {
                axios.post('http://localhost:3000/favorites', repo)
                .then(() => {
                    this.setState({ isSettingFavorite: false });
                })
                .catch(() => {
                    toggleFavorite(repo);
                    this.setState({ isSettingFavorite: false });
                });
            }
        }
    }

    getFavoriteList = () => {
        return this.props.repos.favorites.map(item => {
            return this.state.repos.find(repo => repo.id === item.id);
        });
    }

    render() {
        const { repos, modalVisible } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <FavoriteModal
                visible={modalVisible}
                onRequestClose={this.setModalVisible.bind(this, false)} 
                repos={this.getFavoriteList()} />
                <View style={styles.header}>
                    <Text style={styles.title}>Repositórios</Text>
                    <TouchableOpacity onPress={this.setModalVisible.bind(this, true)}>
                        <Text style={styles.menu}>Ver favoritos ›</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={repos}
                extraData={this.props.repos.favorites.length}
                renderItem={this.renderRepos}
                keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333'
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
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      toggleFavorite,
      setFavorites
    }, dispatch)
);

const mapStateToProps = (state) => {
    const { repos } = state;
    return { repos }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);