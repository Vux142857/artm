import fs from 'fs'
import path from 'path'

export const initFolder = async (dirPath: string) => {
  try {
    const newFolder = path.resolve(dirPath)
    if (!fs.existsSync(newFolder)) {
      fs.mkdirSync(newFolder, {
        recursive: true
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteFile = async (filePath: string) => new Promise<boolean>((resolve, reject) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err)
    }
    resolve(true)
  })
})

export const clearAllFile = async (dirPath: string) => {
  try {
    const files = await fs.readdirSync(dirPath)
    const deleteFilePromises = files.map(file =>
      fs.unlinkSync(path.join(dirPath, file))
    )
    await Promise.all(deleteFilePromises)
  } catch (err) {
    console.log(err)
  }
}