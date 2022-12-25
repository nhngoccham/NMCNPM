import React from 'react'
import { BsImage } from 'react-icons/bs'

const ImagePicker = ({ value = {}, onChange, onError, children, accept = 'image/*,video/*', base64 = false }) => {
    const id = React.useRef(Math.random().toString(36).substring(7))
    const handleChange = e => {
        // e.preventDefault()

        if (e.target.files) {
            const files = Array.from(e.target.files)

            Promise.all(
                files.map(file => {
                    return new Promise(resolve => {
                        const res = file
                        res.url = URL.createObjectURL(file)
                        // res.type = file.type.spit('/')[1]
                        if (file.type.indexOf('image/') > -1) {
                            const img = new Image()
                            img.src = res.url
                            img.onload = () => {
                                res.width = img.width
                                res.height = img.height
                                resolve(res)
                            }
                        } else {
                            const video = document.createElement('video')
                            video.onerror = e => {
                                resolve(res)
                            }
                            video.addEventListener(
                                'loadedmetadata',
                                function () {
                                    res.width = this.videoWidth
                                    res.height = this.videoHeight
                                    video.remove()
                                    resolve(res)
                                },
                                false
                            )
                            video.src = res.url
                        }
                    })
                })
            )
                .then(imgs => onChange && onChange(imgs))
                .catch(e => onError && onError(e))
        }
    }

    return (
        <>
            <label htmlFor={id.current} style={{ cursor: 'pointer' }}>
                {children || <BsImage size={30} />}
            </label>
            <input id={id.current} style={{ display: 'none' }} type="file" accept={accept} multiple onChange={handleChange} />
        </>
    )
}

export default ImagePicker
