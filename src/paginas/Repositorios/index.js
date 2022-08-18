import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { pegarRepositoriosDoUsuario, buscarRepositorio } from '../../servicos/requisicoes/repositorios';

import estilos from './estilos';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepositorio, setNomeRepositorio] = useState('')
    const estaNaTela = useIsFocused()

    useEffect( async () => {
        const resultado = await pegarRepositoriosDoUsuario(route.params.id);
        setRepo(resultado)
    }, [estaNaTela])

    async function buscaRepositorio() {
        const resultado = await buscarRepositorio(nomeRepositorio)
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity 
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio')}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>
            <TextInput
                placeholder="Busque por um repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nomeRepositorio}
                onChangeText={setNomeRepositorio}
            />

            <TouchableOpacity style={estilos.botao}
                onPress={buscaRepositorio}
            >
                <Text style={estilos.textoBotao}>
                    Buscar Repositório
                </Text>
            </TouchableOpacity>
            <FlatList
            data={repo}
            style={{width: '100%'}}
            keyExtractor={repo => repo.id}
            renderItem={({item}) => (
                <TouchableOpacity 
                style={estilos.repositorio}
                onPress={() => navigation.navigate('InfoRepositorio', {item})}
                >
                    <Text style={estilos.repositorioNome}>{item.name}</Text>
                    <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                </TouchableOpacity>
            )}
            />
        </View>

    );
}
