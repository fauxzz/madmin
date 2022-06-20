import { Form, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { get } from '../tools/api';

const {Option} = Select;

const SelectCategories = ({name}) => {
    const [value, setValue] = useState(1);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        initComponent()
    },[])

    const initComponent = async () => {
        const response = await get("/category/all");
        setCategories(response.data)
        setValue(response.data[0].id)
        console.log(response)
    }

    const handleValue = (e) => {
      setValue(e)
    //   onChange(e)
    }

    return (
        <Form.Item name={name} label="Selecciona una categoria">
                    <Select
        onChange={handleValue}
        className="custom_select"
      >
        {/* <Select.Option className="option_" value={1}>1 <Radio checked={category === 1} /></Select.Option> */}
        {categories.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name} <Radio checked={value === item.id} />
          </Option>
        ))}
      </Select>
        </Form.Item>
    );
}

export default SelectCategories;