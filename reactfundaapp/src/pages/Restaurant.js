
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../src/layouts/frontend/Navbar';

import swal from 'sweetalert';


class Restaurant extends Component
{

    state = {
        restaurants: [],
        loading: true, 
    }
    async componentDidMount(){

      const res = await axios.get('http://localhost:8000/api/restaurants');
      //console.log(res);
    
      if(res.data.status === 200)
      {
        this.setState({
            restaurants: res.data.restaurants,
            loading: false,
        });
      }
    }

    deleteRestaurant = async (e, id) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting";

        const res = await axios.delete(`http://localhost:8000/api/delete-restaurant/${id}`);
        if(res.data.status === 200)
        {
            thidClickedFunda.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
        }

    }
     render(){
       <Navbar></Navbar>
        var restaurant_HTMLTABLE = "";
        if(this.state.loading)
        {
         restaurant_HTMLTABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
        }
        else
        {
         restaurant_HTMLTABLE = 
         this.state.restaurants.map( (item) => {
             return (
                 <tr key={item.id}>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.address}</td>
                     <td>{item.email}</td>
                     <td>{item.phone}</td>
                     <td>
                         <Link to={`edit-restaurant/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                         <Link to={`view-restaurant/${item.id}`} className="btn btn-primary btn-sm">View</Link>
                     </td>
                     <td>
                         <button type="button" onClick={(e) => this.deleteRestaurant(e, item.id)}  className="btn btn-danger btn-sm">Delete</button>
                     </td>
                 </tr>
             );
          });
        }


         return(
           <div className="container">
               <Navbar />
               <div className="row">
                   <div className="col-md-12">
                       <div className="card">
                           <div className="card-header">
                               <h4>Restaurants data
                                   <Link to={'add-restaurant'} className="btn btn-primary btn-sm float-end"> Add Restaurant</Link>
                               </h4>
                           </div>
                           <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                           <th>ID</th>
                                           <th>Name</th>
                                           <th>Address</th>
                                           <th>Email ID</th>
                                           <th>Phone</th>
                                           <th>Edit, View</th>
                                           <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurant_HTMLTABLE}
                                    </tbody>
                                </table>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
         );
     }

}

export default Restaurant;