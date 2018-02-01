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
        fetch('seriesList.json',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                /*body: JSON.stringify({'yolo': 'yolo'})*/
            })
            .then(response => response.json())
            .then(seriesList => {
                this.setState({seriesList: seriesList});
                fetch('seriesEpisodesLists.json', {})
                    .then(response => response.json())
                    .then(seriesEpisodesLists => {
                        this.setState({seriesEpisodesLists: seriesEpisodesLists});
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleChange(event) {
        this.setState({
            seriesName: event.target.value
        });
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
