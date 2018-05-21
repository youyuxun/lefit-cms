/**
 * Created by Eugene on 2017/9/1.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon } from 'antd'
import styles from './style.less'

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 'inherit',
  height: 'inherit',
  opacity: 0,
}
const ImgItem = (props) => {
  const {
    max = 5,
    imgList = [],
    preview,
    remove,
    textChange,
    showTitle,
    onUpload,
    multiple = false,
    accept = false,
  } = props
  return (
    <div className={styles.container}>
      {
        imgList && imgList.map((item) => {
          return (
            <div className={styles.item} key={item}>
              <div className={styles.imgWrap}>
                <img className={styles.img} src={item} alt="" />
                <div className={styles.mask}>
                  <div className={styles.iconGroup}>
                    <Icon type="eye-o" className={styles.icon} onClick={() => preview(item)} />
                    {
                      typeof remove === 'function' ?
                        <Icon type="delete" className={styles.icon} onClick={() => remove(item)} /> : null
                    }
                  </div>
                </div>
              </div>
              {
                typeof textChange === 'function' ?
                  (
                    <Input
                      className={styles.input}
                      placeholder="请输入名称"
                      size="small"
                      value={item.name}
                      onChange={(e) => textChange(e.target.value, item)}
                    />
                  ) : null
              }
              {
                showTitle ? <div className={styles.title}>{item.name || '-'}</div> : null
              }
            </div>
          )
        })
      }
      {
        imgList.length < max ?
          (
            <div className="ant-upload ant-upload-select ant-upload-select-picture-card" style={{ position: 'relative', float: 'left' }}>
              <span tabIndex="0" className="ant-upload" role="button">
                <div>
                  <i className="anticon anticon-plus" />
                  <div className="ant-upload-text">上传</div>
                </div>
              </span>
              <input type="file" accept={accept} multiple={multiple} style={style} onChange={onUpload} />
            </div>
          ) : null
      }

    </div>
  )
}

ImgItem.propTypes = {
  imgList: PropTypes.array,
  preview: PropTypes.func.isRequired,
  remove: PropTypes.func,
  textChange: PropTypes.func,
  showTitle: PropTypes.bool,
}
export default ImgItem
