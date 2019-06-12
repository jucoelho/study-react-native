import React , { Component} from 'react'
import {StyleSheet,Text,View,ImageBackground, FlatList, TouchableOpacity, Platform} from 'react-native'
import  moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import  Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'
export default class  Agenda extends Component {
    state = {
        tasks:[
            {id: 12 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :null},
            {id: 13 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :new Date()},
            {id: 14 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :null},
            {id: 15 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :null},
            {id: 16 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :new Date()},
            {id: 6 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :new Date()},
            {id: 7 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :null},
            {id: 8 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :new Date()},
            {id: 9 , desc:'Tarefa teste' , estimateAt:new Date() ,doneAt :null},
            
        ],
        visibleTasks : [],
        showDoneTask : true,
        showAddTask : false,
    }

    addTask = task =>{
        const tasks = [...this.state.tasks]
        tasks.push({
            id :17,
            desc: task.desc,
            estimateAt: task.data,
            doneAt:null,
        })
        this.setState({tasks,showAddTask:false},this.filterTasks)
    }
    filterTasks = () =>{
        let visibleTasks = null
        if(this.state.showDoneTask){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt ===null 
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
    }

    togleFilter = () =>{
        this.setState({showDoneTask : !this.state.showDoneTask},this.filterTasks)
    }

    componentDidMount= () =>{
        this.filterTasks()
    }
    toogleTask = id =>{
        const tasks = [...this.state.tasks]
        tasks.forEach(task =>{
            if(task.id ===id){
                task.doneAt = task.doneAt ? null: new Date()
            }
        })
        this.setState({tasks},this.filterTasks)
    }
    render(){
        return (
            <View style = {styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style = {styles.iconBar}>
                        <TouchableOpacity onPress={this.togleFilter}>
                            <Icon name={this.state.showDoneTask ?'eye' :'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks} 
                        keyExtractor = {item =>`${item.id}`}
                        renderItem ={({item}) =><Task {...item} onToggleTask = {this.toogleTask}/>} />
                </View>
                <ActionButton buttonColor={commonStyles.colors.today}
                 onPress={() =>{this.setState({showAddTask:true})}}/>
            
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container :{ 
        flex :1,
    },
    background: {
        flex:3,
    },
    titleBar:{
        flex:1,
        justifyContent: 'flex-end',
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize:50,
        marginLeft:20,
        marginBottom:10,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize:20,
        marginLeft:20,
        marginBottom:10,
    },
    taskContainer:{
        flex:7,
    },
    iconBar :{
        marginTop : Platform.OS ==='ios' ? 30: 10,
        marginHorizontal: 20,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
})