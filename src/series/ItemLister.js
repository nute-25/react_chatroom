import React, { Component } from "react";


class SeriesItemLister extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesName : '',
            seriesList: [],
            seriesEpisodesLists: []
        };
    }

    componentDidMount() {
        //this.props.route.refreshData("seriesList");
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.seriesList.length ?
                        this.state.seriesList.map(item => <li key={item.id}>{item.seriesName }</li>)
                        : <li>chargement...</li>
                    }
                </ul>
            </div>
        )
    }
}
export default SeriesItemLister;
