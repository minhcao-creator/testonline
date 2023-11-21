import React from 'react'
import './test.css'

function AllTest() {
  return (
    <div className='all-tests'>
        <table>
            <tr>
                <th>Title</th>
                <th>PassCode</th>
                <th>Start Time</th>
            </tr>
            <tr>
                <td>Quiz 1</td>
                <td>Germany</td>
                <td>10:10:10:10:10</td>
            </tr>
            <tr>
                <td>Quiz 2</td>
                <td>Mexico</td>
                <td>10:10:10:10:10</td>
            </tr>
        </table>
    </div>
  )
}

export default AllTest
