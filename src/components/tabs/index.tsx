///<reference path="./index.d.ts" />
import * as React from 'react';
import {TabPane} from 'src/components/tabPane/index';
// const style = require('./index.scss.json') ;
// import style from './index.scss.json';
import * as CSSModules from 'react-css-modules';
import * as classNames from 'classnames';
// let style =require('./index.scss') ;
import * as style from './index.scss';


class Tabs extends React.Component<any, any>{
    constructor(props:any){
        super(props)
        this.state = {
            tabPaneToShow:0
        }
    }
    tabPaneClickToShow(tabIndex:number):void{
        this.setState({...this.state,tabPaneToShow:tabIndex});
    }
    static tabPane = TabPane
    render() {
        console.log(this.props)//这里可以看到react-css-modules中class转换后的映射
        const {tabPaneToShow} = this.state;
        const {children} = this.props;
        return (
            <div>
                <ul styleName="titleWrap">
                    {React.Children.map(this.props.children, (child: React.ReactElement<any>, index) => {
                        return (
                            <li styleName={classNames('title',{'titleChecked':tabPaneToShow === index})} onClick={()=>this.tabPaneClickToShow(index)}>{child.props.title}</li>
                        )
                    })}
                </ul>
                {
                    React.Children.map(this.props.children, (child: React.ReactElement<any>, index) => {
                        return (
                            <div style={{display:(this.state.tabPaneToShow === index?'block':'none')}}>{child.props.children}</div>
                            // <TabPane show={tabPaneToShow === index?"showBlock":"hiddenBlock"}>{child.props.children}</TabPane>
                        )
                    })
                }
            </div>
        )
    }
}

export default CSSModules(Tabs,style,{allowMultiple:true});