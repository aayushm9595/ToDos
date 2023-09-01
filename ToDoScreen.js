import { useEffect } from 'react';
import { View } from 'react-native';

export const ToDoScreen = ({navigation}) => {
    // useEffect(() => {
    //   if(!isAuthenticated) {
    //     navigation.pop()
    //   }
    // }, [isAuthenticated])
    
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'cyan'}}/>
    )
}