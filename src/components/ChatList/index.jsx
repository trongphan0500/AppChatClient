import React, { useState, useEffect, useContext } from "react";
import { Tabs, Avatar, List } from "antd";
import "./style.css";
import axios from "axios";
import { getRoom } from "../../utils/APIRoutes";
import { AppContext } from "../../context/AppProvider";

export default function ChatList({ contacts, changeChat }) {
    const { room, user, setRoomChat, roomChat } = useContext(AppContext);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    // const data = contacts
    const click = (contact) => {
        changeChat(contact);
    };
    const data2 = [];
    const test = () => {
        alert("test");
    };
    useEffect(() => {
        async function fetchData() {
            if (user) {
                try {
                    const data = await axios.post(getRoom, {
                        id: user._id,
                    });
                    setRooms(data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [user]);

    // console.log(rooms);
    return (
        <div className="chatlist">
            <Tabs defaultActiveKey="1" className="tabs">
                <Tabs.TabPane tab="Bạn bè" key="1">
                    {/* <List
            className="list1"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item)  => (
              <List.Item className="list-item1">
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a >{item.username}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          /> */}
                    {contacts.map((contact, index) => {
                        return (
                            <div
                                className="contact"
                                onClick={() => click(contact)}
                            >
                                <div className="avt">
                                    <Avatar src={contact.avatarImage} />
                                </div>
                                <div className="name">
                                    <h3>{contact.username}</h3>
                                    <p>Hello</p>
                                </div>
                            </div>
                        );
                    })}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Nhóm" key="2">
                    {/* <List
            className="list2"
            itemLayout="horizontal"
            dataSource={data2}
            renderItem={(item) => (
              <List.Item className="list-item2">
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">test</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          /> */}
                    {/* {room.map((rom, index) => {
            return (
              <h1>{rom.user.username}</h1>
            )})} */}
                    {rooms === undefined ? (
                        <div></div>
                    ) : (
                        // <div className="contact" onClick={() => click(room)} >
                        //   <div className="avt">
                        //       <Avatar src="https://joeschmoe.io/api/v1/random" />

                        //     </div>
                        //     <div className="name">

                        //       <h3>Ten nhom</h3>
                        //       <p> thành viên </p>
                        //     </div>
                        // </div>
                        <div>
                            {rooms.map((room, index) => {
                                return (
                                    <div
                                        className="contact"
                                        onClick={() => setRoomChat(room)}
                                    >
                                        <div className="avt">
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        </div>
                                        <div className="name">
                                            <h3>{room.roomName}</h3>
                                            <p>
                                                {room.members.length} thành viên
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}
