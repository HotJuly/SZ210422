import React,{Component} from 'react'

class App extends Component{
    state={
        msg:1
    }

    refAAA=React.createRef();

    handleClick=()=>{
        // console.log('msg1',this.state.msg)
        // this.setState({
        //     msg:this.state.msg+1
        // })
        // console.log('msg2',this.state.msg)
        // this.setState({
        //     msg:this.state.msg+1
        // })
        // console.log('msg3',this.state.msg)
        // this.setState({
        //     msg:this.state.msg+1
        // })
        console.log('msg4',this.state.msg)
    }


    render(){
        return(
            <div>
                <h1>{this.state.msg}</h1>
                <button ref={this.refAAA} onClick={this.handleClick}>+1</button>
                {/* <button ref={this.refAAA}>+1</button> */}
            </div>
        )
    }

    componentDidMount(){
        this.refAAA.current.onclick=()=>{
            console.log('msg1',this.state.msg)
            // this.setState({
            //     msg:this.state.msg+1
            // })
            // console.log('msg2',this.state.msg)
            // this.setState({
            //     msg:this.state.msg+1
            // })
            // console.log('msg3',this.state.msg)
            // this.setState({
            //     msg:this.state.msg+1
            // })
            // console.log('msg4',this.state.msg)
        }
    }
}

export default App;