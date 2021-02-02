// import React from 'react'

// import { useParams, Link, useLocation, useHistory } from 'react-router-dom'
// import { Button, Icon, Comment, Form } from 'semantic-ui-react'
// import Popup from 'reactjs-popup'
// import useForm from '../../utils/useForm'
// import moment from 'moment'


// import { getSingleProperty, getAllProperties, deleteProperty, favouriteAProperty, unFavouriteProperty, createPropertyReview } from '../../lib/api'
// // import Popup from 'reactjs-popup'
// // import useForm from '../../utils/useForm'
// import { isAuthenticated, isOwner, getUserId } from '../../lib/auth'


// import PropertyShowMap from './PropertyShowMap'
// import PropertyShowPopup from './PropertyShowPopup'
// import PropertyNavBar from './PropertyNavBar'

// function PropertyShowPageRefresh() {

//   moment().format()
//   const { id } = useParams()
  
//   const isLoggedIn = isAuthenticated()
//   const history = useHistory()
//   useLocation()

//   const [property, setProperty] = React.useState([])
//   const [properties, setProperties] = React.useState([])
  
//   const [isFavourite, setIsFavourite] = React.useState(false)

//   const [reviews, setReviews] = React.useState(null) 
//   const [newReview, setNewReview] = React.useState()

 
//   const { formdata, handleChange, errors, setErrors } = useForm({
//     text: '', 
//     rating: '',
//     owner: {}, 
//     property: ''
//   })
//   console.log(errors)

//   React.useEffect(() => {
//     const getProperties = async () => {
//       try {
//         const { data } = await getAllProperties()
//         console.log(data)
//         setProperties(data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getProperties()
//   }, [])

 

//   React.useEffect(() => {

//     const getData = async () => {
//       try {
//         const { data } = await getSingleProperty(id)
//         setProperty(data)
//         console.log(data)
//         const found = data.favorited_by.some(owner => owner.id === getUserId())
//         console.log(found)
//         if (found) {
//           setIsFavourite(true)
//         }
     
//         if (data.reviews) {
//           setReviews(data.reviews)
//         }
//         console.log(reviews)
//         // setViewport({ latitude: Number(data.latitude), longitude: Number(data.longitude), zoom: 7 })
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getData()
//   }, [id, newReview])
 




//   // Favourite A Property

//   const handleFavouriteProperty = async event => {
//     event.preventDefault()
//     try {
//       await favouriteAProperty(id)
//       setIsFavourite(!isFavourite)
//     } catch (err) {
//       console.log(err)
//     }
//     //* Add to favourites
//   }

//   const handleUnFavourite = async event => {
//     event.preventDefault()
//     try {
//       setIsFavourite(!isFavourite)
//       await unFavouriteProperty(id)
//     } catch (err) {
//       console.log(err)
//     }
//     //* Remove from favourites
//   }

  

//   // Delete Property
//   const handleDelete = async event => {
//     event.preventDefault()
//     try {
//       await deleteProperty(id)
//       history.push('/properties')
//     } catch (err) {
//       console.log(err)
//     }
//   }





//   const handleShowSearch = () => {
//     history.push('/properties')
//   }



//   // * Submit Reviews
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const propertyId = e.target.name
//       console.log(e.target.name)
//       const reviewToAdd = { ...formdata, property: propertyId, owner: getUserId() }
      
//       console.log(reviewToAdd)
//       await createPropertyReview(reviewToAdd)
//       setNewReview({ propertyId, formdata })
//       // const { data } = await getSingleProperty(id)
//       // setProperty(data)
//       formdata.text = ''
//       formdata.rating = ''
//     } catch (err) {
//       setErrors(err.response.data.errors)
//     }
//   }



//   return (
//     <section className="show-page-container">
//       <PropertyNavBar handleSearch={handleShowSearch} className="navbar"/>


//       <div className="showpage-top-layer">
//         <div className="showpage-image-buttons-container">
//           <div className="showpage-main-image">
//             <img src={property.property_image} />
//           </div>
//           <div className="showpage-buttons-container">
//             {isLoggedIn ?
//               <>
              
//                 <div className="icon-buttons">
//                   {
//                     !isFavourite ?
//                       <Button className="favorite-button" style={{ backgroundColor: '#012349', borderRadius: 100, color: 'white' }} onClick={handleFavouriteProperty}>
//                         <Icon name="favorite"/>
//                       </Button>
//                       :
//                       <Button className="favorite-button" onClick={handleUnFavourite} style={{ backgroundColor: '#012349', borderRadius: 100, color: 'gold' }} >
//                         <Icon name="favorite"/>
//                       </Button>
//                   }
//                   <>
//                     {isOwner(property.owner ? property.owner.id : '') &&
//                 <>
//                   <Button as={Link} to={`/properties/${id}/edit`} className="edit-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
//                     <Icon name="edit" />
//                   </Button>
//                   {/* <Button onClick={handleDelete} className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
//                     <Icon name="trash alternate"/>
//                   </Button> */}
//                   <Popup
//                     trigger={<Button onClick={handleDelete} className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
//                       <Icon name="trash alternate"/>
//                     </Button>}
//                     modal
//                     nested
//                   >
//                     {close => (
//                       <div className="delete-modal">
//                         <button className="close" onClick={close}>
// &times;
//                         </button>
//                         <div className="header"> 
//                           <h3>Are you sure you want to delete this property?</h3>
//                         </div>
//                         <div className="delete-popup-buttons">
//                           <Button onClick={handleDelete} >Yes</Button>
//                           <Button as={Link} to={'/properties/'}>No</Button>
//                         </div>
//                       </div>
//                     )}
//                   </Popup>
//                 </>
//                     }
//                   </>
//                 </div>
              
//               </>
//               :
//               ''
//             }
//           </div>
//         </div>

//         <div className="showpage-top-right-section">
//           <div className="showpage-property-details">
//             <h2>{property.name}</h2>
//             <p>{property.address}</p>
//             <p>{property.city}, {property.country}</p>
//             {/* <h6>{property.types.name[0]}</h6> */}
//             <p>{property.description}</p>
//             <Icon name="bath" className="index-icon"></Icon>
//             <p>{property.bathrooms} bathrooms </p>
//             <Icon name="bed" className="index-icon"></Icon>
//             <p>{property.bedrooms} bedrooms </p>
//           </div>


        
//           <div className="swap-section">

//             {isLoggedIn ?
//               <>
//                 <PropertyShowPopup property={property} id={id} />
            
//               </>
//               :
//               <div>
//                 <Button as={Link} to='' className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
//         Request A Swap <Icon name="exchange" className="exchange-icon"/>
//                 </Button>
//               </div>
//             }

            

//           </div>
      
    



//         </div>
//       </div>


//       <div className="showpage-middle-section">
//         <div className="showpage-review-section">
//           <div className="showpage-reviews-container">
//             <h2>Reviews</h2>
//             <div className="showpage-reviews-info">
//               <Comment.Group>
//                 {reviews ? reviews.map(review => {
//                   return <Comment key={review.id}>
//                     <Comment.Avatar as='a' src={review.owner.profile_image} />
//                     <Comment.Content>
//                       <Comment.Author>{review.owner.first_name} {review.owner.last_name}</Comment.Author>
//                       <Comment.Metadata>
//                         <div>{<p><small className="text-muted px-1">{moment(review.created_at).fromNow()}</small></p>}</div>
//                         <div>
//                           <Icon name='star' />{review.rating}
//                         </div>
//                       </Comment.Metadata>
//                       <Comment.Text>
//                         <p>{review.text}</p>
//                       </Comment.Text>
//                     </Comment.Content>
//                   </Comment>
//                 })
//                   :
//                   ''
//                 }
//               </Comment.Group>
//             </div>
//           </div>
          
       
//           <Popup
//             trigger={<Button as={Link} className="review-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
//                 Leave a Review <Icon name="review" className="review-icon"/>
//             </Button>}
//             modal
//             nested
//           >
//             {close => (
//               <div className="review-modal">
//                 <button className="close" onClick={close}>
// &times;
//                 </button>
//                 <div className="delete-popup-buttons">
//                   <Form.Field>
//                     <label>Leave A Review</label>
//                     <textarea placeholder='eg. I loved this property!'
//                       onChange={handleChange}
//                       name="text"
//                       value={formdata.text}
//                     />
//                     <p>Rating</p>
//                     {/* <select placeholder="e.g. 5" onClick={handleChange} value={formdata.rating}>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4">4</option>
//                           <option value="5">5</option> */}
//                     {/* </select> */}
//                     <input placeholder='eg. 5'
//                       onChange={handleChange}
//                       name="rating"
//                       value={formdata.rating}
//                     />
//                     <Button onClick={handleSubmit} name={property.id} className="submit-review" type="submit" style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349' }}>Submit Review</Button>
//                   </Form.Field>
//                 </div>
//               </div>
//             )}
//           </Popup>
//         </div>
//         <div className="showpage-map-and-user">
//           <div className="showpage-user-info">
//             <div className="showpage-user-details">
//               {property.owner ? 
//                 <div className="showpage-user-fields">
//                   <h2>{property.owner.first_name} {property.owner.last_name}</h2>
//                   <div className="showpage-user-info">
//                     <div className="showpage-user-deets">
//                       <p>{property.owner.email}</p>
//                       <p>{property.owner.bio_description}</p>
//                     </div>
//                     <div className="showpage-user-image-button">
//                       <div className="showpage-user-image">
//                         <img src={property.owner ? property.owner.profile_image : '' } />
//                       </div>
//                       <div className="showpage-contact-button">
//                         <Button as={Link} to={isLoggedIn ? `/users/profile/${property.owner.id}` : '/login'}className="request-button"  style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
//                           {property.owner ? `View ${property.owner.first_name}s profile` : '' }
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 :
//                 ''
//               }
//             </div>
//           </div>
//           <div className="showpage-map-section">
//             <PropertyShowMap property={property}/>
//           </div>
//         </div>

//       </div>




//       <div className="showpage-bottom-section"> 

//         <div className="featured-container">
//           <div className="featured-header">
//             <h2>Featured Properties</h2>
//           </div>
//           <div className="index-grid">
//             {properties ? properties.slice(40, 43).map(property => (
//               <Link to={`/properties/${property.id}`} key={property.id} className="index-grid-div-container" >
//                 <div className="index-grid-div">
//                   <img src={property.property_image} />
//                   <div className="index-grid-house-info">
//                     <div className="house-name-details">
//                       <p>{property.name}</p>
//                       <p>{property.city}, {property.country}</p>
//                     </div>
//                     <div className="house-details">
//                       <div className="bathrooms">
//                         <Icon name="bath" className="index-icon"></Icon>
//                         <p>{property.bathrooms} bathrooms </p>
                      
//                       </div>
//                       <div className="bedrooms">
//                         <Icon name="bed" className="index-icon"></Icon>
//                         <p>{property.bedrooms} bedrooms </p>
                      
//                       </div>
//                     </div>
//                   </div>
//                   <div className="index-user-info">
//                     <div className="index-owner-details">
//                       <div className="user-profile-image">
//                         <img src={property.owner.profile_image}></img>
//                       </div>
//                       <p>Added by {property.owner.first_name} {property.owner.last_name}</p>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//               :
//               ''
//             }
//           </div>
//         </div>

//       </div>

//     </section>
//   )
// }

// export default PropertyShowPageRefresh