import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { axiosInstance } from '../config/api'

const EmailModal = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true)
  const [email, setEmail] = useState('')

  const handleClose = () => {
    setShowModal(false)
    onClose()
  }

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get('/account/profile')
      localStorage.setItem('user_info', JSON.stringify(response.data.data))
    } catch (error) {
      console.error('Error in handleAgreeAndConfirm:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/account/update-profile', {
        email: email,
      })

      if (response.data && response.data.data) {
        setShowModal(false)
        toast.success('Email Updated Successfully')
        window.location.reload()
      } else {
        toast.error('Failed to update email. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to update email. Please try again.')
      console.error('Error in handleSubmit:', error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {/* Login Popup  */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="text-center">
              <img
                src={
                  process.env.PUBLIC_URL + '../assets/images/logo/fg_group.webp'
                }
                width="20%"
                alt="Fg Group"
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group
              controlId="formBasicUsername"
              className="mb-4 text-center"
            >
              <Form.Label className="label_modal text-center mb-2">
                Enter Email
              </Form.Label>
              <Form.Control
                type="text"
                className="fr"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              type="button"
              className="submit_modal"
              style={{
                width: '100%',
                color: '#fff',
                margin: '0',
                backgroundImage:
                  'linear-gradient(101deg, rgb(247, 69, 48), rgb(255, 46, 115))',
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EmailModal
