import axios from 'axios'
import { getToken } from './auth'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

const baseUrl = '/api'


// * Get Properties Requests

// Get All Properties

export function getAllProperties() {
  return axios.get(`${baseUrl}/properties/`)
}

// Get single Property 

export function getSingleProperty(id) {
  return axios.get(`${baseUrl}/properties/${id}`)
}

// Create a Property

export function createProperty(formdata) {
  return axios.post(`${baseUrl}/properties`, formdata, headers())
}

// Delete a property 

export function deleteProperty(id) {
  return axios.delete(`${baseUrl}/properties/${id}`, headers())
}

// Edit a Property

export function editProperty(id, formdata) {
  return axios.put(`${baseUrl}/properties/${id}`, formdata, headers())
}

// * Reviews requests

// Get All Reviews

export function getAllReviews() {
  return axios.get(`${baseUrl}/reviews`)
}

// Get One Review

export function getSingleReview(id) {
  return axios.get(`${baseUrl}/reviews/${id}`)
}

// Create a Property Review

export function createPropertyReview(formdata, id) {
  return axios.post(`${baseUrl}/properties/${id}/reviews`, formdata, headers())
}

// Create a User Review

export function createUserReview(formdata, id) {
  return axios.post(`${baseUrl}/profile/${id}/reviews`, formdata, headers())
}

// Delete Property Review

export function deletePropertyReview(id, reviewId) {
  return axios.delete(`${baseUrl}/properties/${id}/reviews/${reviewId}`, headers())
}

// Delete User Review

export function deleteUserReviw(id, reviewId) {
  return axios.delete(`${baseUrl}/profile/${id}/reviews/${reviewId}`, headers())
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}

export function showUserProfile() {
  return axios.get(`${baseUrl}/profile/`, headers())
}

export function editUserProfile(formdata) {
  return axios.put(`${baseUrl}/update-profile/`, formdata, headers())
}