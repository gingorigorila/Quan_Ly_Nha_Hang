import React, {Component,inputs} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
class Viewrestaurant extends Component
{
    state = {
        name: '',
        address: '',
        file: '',
        file_path: '',
        image: '',
        email: '',
        phone: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    
    async componentDidMount() {

        let { id } = this.props.params;
        //console.log(id);
        const res = await axios.get(`http://localhost:8000/api/edit-restaurant/${id}`);
        if(res.data.status === 200)
        {
          this.setState({
            name: res.data.restaurant.name,
            address: res.data.restaurant.address,
            email: res.data.restaurant.email,
            phone: res.data.restaurant.phone,  
          });
        }
        else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            this.props.history.push('/');
        }
    }

    updateRestaurant = async (e) => {
        e.preventDefault();
        
        //document.getElementById('updatebtn').disabled = true;
        //document.getElementById('updatebtn').innerText = "Updating";
        let { id } = this.props.params;
        const res = await axios.put(`http://localhost:8000/api/update-restaurant/${id}`, this.state);
        if(res.data.status === 200)
         {
           //console.log(res.data.message);
           swal({
            title: "Updated!",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });
          this.props.history.push('/');

           //document.getElementById('updatebtn').disabled = false;
           //document.getElementById('updatebtn').innerText = "Update Restaurant";
        
         }
        else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            this.props.history.push('/');
        }
        else
        {
            this.setState({
                error_list: res.data.validate_err,
             });
        }
    
    }   

     render(){
         return(
             <div>
               <h2>View Restaurants</h2>
               <div className="row">
                   <div className="col-md-6">
                     <div className="card p-4">
                        <h4>Restaurant Name</h4>
                         <p>{ this.state.name }</p>
                         <h4>Restaurant Address</h4>
                         <p>{ this.state.address}</p>
                         <h4>Restaurant Email</h4>
                         <p>{ this.state.email }</p>
                         <h4>Restaurant Phone</h4>
                         <p>{ this.state.phone }</p>
                         
                     </div>
                   </div>
               </div>
           </div>
         );
     }

}

export default withParams(Viewrestaurant);