import { ActivityIndicator,FlatList,StyleSheet } from 'react-native'

import { Text,View } from '@/components/Themed'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function TabThreeScreen() {
  const { data, isLoading } = useTodo()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {isLoading && <ActivityIndicator />}
      {data && <FlatList data={data ?? []} renderItem={({item}) => <Text>{item.title}</Text>} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

function useTodo() {
  return useQuery('todos', async () => {
    // These are failing for me with HTTPS for some weird reason.
    const response = await axios.get<Todo[]>('http://jsonplaceholder.typicode.com/todos')
    return response.data
  },
  {
  })
}

interface Todo {
  id: number
  title: string
  completed: boolean
}