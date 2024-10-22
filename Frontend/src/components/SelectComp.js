import React from 'react'

function SelectComp() {
  return (
    
<label class="text-gray-700 mb-8 " for="animals">
   
    <select id="animals" class=" mb-5 bg-white border border-gray-300 rounded-xl w-full py-2 px-4 shadow-sm h-12  focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
        <option value="">
            Select a Role
        </option>
        <option value="patient">
            farmer
        </option>
        <option value="Doctor">
            distributer
        </option>
        <option value="Ministry">
            supplier
        </option>
        <option value="Ministry">
            whole saler
        </option>
        <option value="Ministry">
            Admin
        </option>
      
    </select>
</label>

  )
}

export default SelectComp