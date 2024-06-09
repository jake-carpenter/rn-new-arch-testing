import { ActivityIndicator,FlatList,StyleSheet } from 'react-native'

import { Text,View } from '@/components/Themed'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get<Todo[]>('http://jsonplaceholder.typicode.com/todos')
      console.log(response.data)
      return response.data
    },
    throwOnError: (error) => {
      // Does not throw by default anymore.
      console.log(error.message)
      return true;
    },
  })
}

interface Todo {
  id: number
  title: string
  completed: boolean
}