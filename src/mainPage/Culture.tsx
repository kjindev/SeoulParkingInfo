import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  musicalCntUpdate,
  movieCntUpdate,
  classicCntUpdate,
  educationCntUpdate,
  concertCntUpdate,
} from "../store/counterSlice";
import Modal from "../routePage/Modal";
import Menu from "../routePage/Menu";

interface propsType {
  data: {
    CODENAME: string;
    GUNAME: string;
    MAIN_IMG: string;
    TITLE: string;
    DATE: string;
    PLACE: string;
  }[];
}

interface DataType {
  CODENAME: string;
  GUNAME: string;
  MAIN_IMG: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
}

export default function Culture({ data }: propsType) {
  const dataRef = useRef<HTMLInputElement>(null);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [name, setName] = useState<string>(sessionStorage.name);
  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 0; i < 25; i++) {
      if (name === dataRef.current?.children[0].children[i + 1].id) {
        dataRef.current?.children[0].children[i + 1].classList.add(
          "styleClick"
        );
      }
    }
    if (sessionStorage.list) {
      setDataList(JSON.parse(sessionStorage.list));
    }
  }, []);

  const handleMapClick = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLDivElement;
    let list = [];
    if (targetElement.dataset.name !== undefined) {
      for (let i = 0; i < 25; i++) {
        dataRef.current?.children[0].children[i + 1].classList.remove(
          "styleClick"
        );
      }
      targetElement.classList.add("styleClick");
      sessionStorage.setItem("name", targetElement.id);
      for (let i = 0; i < data.length; i++) {
        if (data[i].GUNAME === targetElement.id) {
          list.push(data[i]);
        }
      }
      setDataList(list);
      sessionStorage.setItem("list", JSON.stringify(list));
    }
  };

  const handleListclick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLDivElement;
    if (
      target.parentElement?.dataset.codename === "뮤지컬/오페라" ||
      target.parentElement?.dataset.codename === "독주/독창회" ||
      target.parentElement?.dataset.codename === "연극"
    ) {
      dispatch(musicalCntUpdate());
    } else if (target.parentElement?.dataset.codename === "영화") {
      dispatch(movieCntUpdate());
    } else if (
      target.parentElement?.dataset.codename === "클래식" ||
      target.parentElement?.dataset.codename === "국악" ||
      target.parentElement?.dataset.codename === "무용"
    ) {
      dispatch(classicCntUpdate());
    } else if (
      target.parentElement?.dataset.codename === "교육/체험" ||
      target.parentElement?.dataset.codename === "전시/미술"
    ) {
      dispatch(educationCntUpdate());
    } else if (
      target.parentElement?.dataset.codename === "콘서트" ||
      target.parentElement?.dataset.codename === "축제"
    ) {
      dispatch(concertCntUpdate());
    }
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-neutral-100 ">
        <Menu />
        <Modal />
        <div className="w-[95%] h-[95%] md:w-[80%] md:h-[90%] flex flex-col justify-centerpx-1 py-3 md:p-7">
          <div className="h-[10%] text-center md:text-start">
            <div className="font-bold maxxs:text-lg text-3xl">
              | 서울시 문화행사 안내
            </div>
            <div className="maxxs:text-xs text-sm md:text-base">
              지도를 클릭하여 문화 정보를 확인하세요
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center w-[100%] h-[90%]">
            <div
              className="w-[100%] mobile:w-[80%] md:w-[50%] md:h-[50%] flex justify-end items-center drop-shadow-lg"
              onClick={handleMapClick}
              ref={dataRef}
            >
              <svg viewBox="0 0 800 656" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="dropshadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
                    <feOffset dx="0" dy="0" result="offsetblur" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="dropshadow2">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
                    <feOffset dx="1" dy="1" result="offsetblur" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  id="중구"
                  data-name="중구"
                  className="style"
                  d="M 477 316 l 0 9 5 5 -1 3 -4 5 -4 5 -5 4 -4 7 -3 4 -4 3 -4 10 -2 -1 -3 -7 -2 -5 -2 1 -1 0 -2 -1 -3 1 0 0 -3 1 -4 2 -5 -5 -6 -3 -10 -3 -4 -1 -3 -1 -2 2 -4 -1 -3 -1 -9 0 -2 2 -4 3 0 -7 1 -4 -2 -2 0 -1 6 -3 6 -4 -1 -2 -2 -5 2 -3 4 -3 9 -1 10 1 9 2 9 -1 8 -1 9 -1 8 0 11 -1 z "
                />
                <path
                  id="종로구"
                  data-name="종로구"
                  className="style"
                  d="M 455 297 l 4 -2 1 0 1 0 3 -1 4 5 7 3 2 6 0 8 -11 2 -11 1 -8 0 -9 1 -8 1 -9 1 -9 -2 -10 -1 -9 1 -4 3 -2 3 -6 -6 -3 -4 -5 -6 -4 -5 -2 -5 5 -3 0 -6 0 -10 0 -9 1 -9 -3 -4 -2 0 -2 0 -1 -4 0 -9 -5 -9 1 -10 -1 -11 -1 -6 2 -6 5 -2 7 -3 10 -2 2 -1 3 0 1 0 4 -2 8 -1 3 6 4 1 3 8 3 10 1 6 3 5 0 9 0 7 -1 5 -6 3 -6 4 -1 5 6 4 5 3 5 4 9 1 10 0 4 4 3 4 5 10 1 3 z "
                />
                <path
                  id="용산구"
                  data-name="용산구"
                  className="style"
                  d="M 394 349 l 3 1 4 1 2 -2 3 1 4 1 10 3 6 3 5 5 4 -2 3 -1 0 0 3 -1 2 1 1 0 2 -1 2 5 3 7 2 1 5 9 6 2 2 9 -4 5 -4 5 -5 6 -3 4 -5 4 -5 5 -5 4 -5 3 -8 8 -5 8 -7 3 -7 -1 -10 -4 -3 -1 -6 -3 -6 -5 -5 -3 -6 -3 -9 -3 1 -5 0 -10 -2 -8 -6 -11 5 -2 4 -1 5 -4 5 -6 2 -5 3 -6 6 -5 0 -3 -2 -3 4 -3 2 -2 z "
                />
                <path
                  id="은평구"
                  data-name="은평구"
                  className="style"
                  d="M 368 148 l 3 2 1 3 2 11 2 9 2 8 3 5 0 5 -3 3 -5 5 -7 3 -5 2 -2 6 1 6 1 11 -1 10 -7 6 -4 3 -4 7 0 7 -5 2 -9 4 -4 4 -3 5 -3 7 -5 4 -3 4 -8 -1 0 -3 -1 0 -3 -2 -3 2 -4 5 -4 5 -5 5 -1 5 -9 -8 -12 -9 -1 -2 -6 -6 -4 -5 6 -9 1 2 -2 5 2 5 8 0 9 -1 3 -6 1 -4 2 -5 -1 -9 2 -8 -2 -10 2 -10 4 -7 3 -4 2 -6 2 -9 -1 -10 5 -4 0 -1 -1 -5 1 -4 1 -4 0 -5 -5 -3 -5 -5 0 -1 1 1 5 3 6 4 11 -1 10 -3 3 -3 4 -2 9 -4 4 -5 3 -5 5 -2 6 -2 3 4 z "
                />
                <path
                  id="서대문구"
                  data-name="서대문구"
                  className="style"
                  d="M 365 255 l 1 4 2 0 2 0 3 4 -1 9 0 9 0 10 0 6 -5 3 2 5 4 5 5 6 3 4 6 6 2 5 1 2 -6 4 -6 3 -3 3 -8 0 -10 1 -11 1 -7 2 -10 -4 -7 -6 -2 -10 -6 -3 -6 -2 -4 -2 -8 -4 -5 -5 -7 -5 1 -5 5 -5 4 -5 4 -5 3 -2 3 2 1 0 0 3 8 1 3 -4 5 -4 3 -7 3 -5 4 -4 9 -4 5 -2 0 -7 4 -7 4 -3 7 -6 5 9 z "
                />
                <path
                  id="마포구"
                  data-name="마포구"
                  className="style"
                  d="M 263 289 l 12 9 9 8 7 5 5 5 8 4 4 2 6 2 6 3 2 10 7 6 10 4 7 -2 11 -1 10 -1 8 0 3 -3 0 1 2 2 -1 4 0 7 2 3 0 3 -6 5 -3 6 -2 5 -5 6 -5 4 -4 1 -5 2 -7 -4 -5 -4 -5 -3 -5 -2 -4 1 -4 2 -6 -4 -11 0 -12 0 -5 -2 -6 -7 -6 -6 -8 -4 -8 -4 -5 -4 -5 -3 -11 -7 -8 -5 -4 -2 -6 -4 -4 -4 -4 -3 -6 -6 -1 -3 8 -4 4 -2 4 -2 10 -2 10 -2 3 -2 0 -1 -1 -6 0 -5 4 -5 5 -4 4 5 6 6 z "
                />
                <path
                  id="광진구"
                  data-name="광진구"
                  className="style"
                  d="M 605 315 l 1 1 -1 4 -1 7 -2 9 3 6 4 4 3 -3 9 -1 3 3 -4 10 -2 10 -2 5 -2 4 -4 5 -5 5 -5 4 -11 12 -3 3 -3 2 -8 5 -6 3 -5 1 -5 -1 -5 -1 -6 -2 -12 -5 -7 -4 13 -27 5 -12 3 -5 5 -20 3 -8 4 -5 4 -9 7 1 11 3 9 -3 4 -3 4 -2 z "
                />
                <path
                  id="성동구"
                  data-name="성동구"
                  className="style"
                  d="M 511 315 l 7 4 6 6 4 4 6 5 2 0 15 3 4 0 -5 20 -3 5 -5 12 -3 7 -10 20 -7 -4 -5 -3 -4 -4 -10 -3 -10 0 -7 0 -12 0 -8 4 -2 -9 -6 -2 -5 -9 4 -10 4 -3 3 -4 4 -7 5 -4 4 -5 4 -5 1 -3 -5 -5 0 -9 6 1 11 -1 5 -2 2 -1 6 0 z "
                />
                <path
                  id="중랑구"
                  data-name="중랑구"
                  className="style"
                  d="M 621 218 l 5 3 1 6 0 10 2 8 -3 8 -3 5 0 3 3 4 -1 6 -4 2 -5 9 0 5 -4 6 -4 3 -4 5 -3 10 -4 2 -4 3 -9 3 -11 -3 -7 -1 -3 -5 -1 -11 -2 -3 -3 -6 -3 -9 -1 -6 -2 -9 3 -6 2 -5 -2 -10 0 -8 2 -11 6 -3 4 -1 9 -4 9 1 10 1 6 -2 9 -1 z "
                />
                <path
                  id="동대문구"
                  data-name="동대문구"
                  className="style"
                  d="M 554 245 l 2 10 -2 5 -3 6 2 9 1 6 3 9 3 6 2 3 1 11 3 5 -4 9 -4 5 -3 8 -4 0 -15 -3 -2 0 -6 -5 -4 -4 -6 -6 -7 -4 -4 -2 -6 0 -2 1 -5 2 -11 1 -6 -1 0 -8 -2 -6 6 -4 6 -5 4 -6 3 -4 4 -5 2 -3 6 -8 4 -2 8 -3 4 -5 7 -1 7 -2 4 -6 7 -2 z "
                />
                <path
                  id="성북구"
                  data-name="성북구"
                  className="style"
                  d="M 455 297 l -3 -2 -1 -3 -5 -10 -3 -4 -4 -4 -10 0 -9 -1 -5 -4 -5 -3 -6 -4 1 -5 6 -4 6 -3 1 -5 0 -7 0 -9 -3 -5 -1 -6 -3 -10 -3 -8 -4 -1 -3 -6 9 -5 4 -3 4 1 5 4 6 4 3 2 4 5 5 5 7 3 5 2 -1 3 0 0 0 2 1 3 5 6 9 3 4 3 5 3 8 -1 6 4 9 -4 4 -6 4 -4 4 -4 4 -6 4 -3 5 4 4 5 5 5 5 4 9 0 9 -2 -2 11 0 8 -7 1 -7 2 -4 6 -7 2 -7 1 -4 5 -8 3 -4 2 -6 8 -2 3 -4 5 -3 4 -4 6 -6 5 -6 4 -7 -3 -4 -5 -3 1 -1 0 -1 0 z "
                />
                <path
                  id="도봉구"
                  data-name="도봉구"
                  className="style"
                  d="M 463 157 l -2 -4 0 -4 1 -5 2 -8 2 -9 2 -6 2 -4 -1 -2 -3 -5 -4 -7 -4 -5 -3 -7 -1 -9 0 -8 4 -11 8 -8 10 1 9 0 3 4 1 6 3 5 9 -1 4 -2 4 -1 4 4 5 0 5 13 0 9 -1 5 -4 12 0 8 3 9 2 9 3 10 1 9 2 7 -2 13 -3 -4 -2 -3 -2 3 -5 5 -1 6 -4 9 -1 7 -6 -6 -3 -7 -5 -4 -2 -6 -7 -6 -3 -3 -7 -5 -3 -2 -2 1 -3 0 z "
                />
                <path
                  id="강북구"
                  data-name="강북구"
                  className="style"
                  d="M 448 87 l 2 0 1 0 0 0 4 4 3 7 4 5 4 7 3 5 1 2 -2 4 -2 6 -2 9 -2 8 -1 5 0 4 2 4 5 3 3 0 2 -1 3 2 7 5 3 3 7 6 2 6 5 4 3 7 6 6 7 6 3 6 -4 3 -4 6 -4 4 -4 4 -4 6 -9 4 -6 -4 -8 1 -5 -3 -4 -3 -9 -3 -4 -6 -2 -3 0 -2 0 0 1 -3 -5 -2 -7 -3 -5 -5 -4 -5 -3 -2 -6 -4 -5 -4 -4 -1 3 -4 0 -6 -3 -4 1 -3 2 -3 -2 -4 -3 -7 -4 -9 4 -1 7 -7 4 -8 6 -4 2 -5 0 -13 -1 -7 2 -5 6 -5 7 -2 z "
                />
                <path
                  id="노원구"
                  data-name="노원구"
                  className="style"
                  d="M 619 183 l 1 7 -3 7 -6 5 -3 7 1 8 -9 1 -6 2 -10 -1 -9 -1 -9 4 -4 1 -6 3 -9 2 -9 0 -5 -4 -5 -5 -4 -5 -5 -4 -3 -6 -7 -6 1 -7 4 -9 1 -6 5 -5 2 -3 2 3 3 4 2 -13 -2 -7 -1 -9 -3 -10 -2 -9 -3 -9 0 -8 4 -12 1 -5 0 -9 6 -4 5 -2 4 -4 4 -6 6 0 3 1 4 0 5 -1 4 -2 7 -1 5 8 5 5 5 0 3 -1 5 4 -3 10 -2 7 -1 2 1 3 3 7 2 8 -2 11 -2 5 -3 4 0 4 2 6 1 6 0 10 3 5 7 0 5 -2 5 0 4 4 4 3 z "
                />
                <path
                  id="강서구"
                  data-name="강서구"
                  className="style"
                  d="M 134 254 l 3 3 6 4 4 4 4 6 4 3 6 4 5 4 6 4 5 3 4 4 6 5 3 2 6 5 9 6 1 3 6 6 4 3 4 4 6 4 4 2 8 5 11 7 -4 8 3 9 -8 1 -8 -2 -5 -4 -5 -2 -2 8 0 10 1 9 0 7 -1 8 -7 2 -11 1 -7 2 -12 -1 -3 -4 -3 -7 -3 -9 -2 -6 -5 -5 -1 -6 -5 2 -3 7 -10 2 -9 -1 -7 -4 -3 -2 0 1 -9 5 -2 5 -6 2 -2 -6 -4 -5 -5 -4 -7 -2 -9 -2 -7 -4 -4 1 -1 -2 -2 -2 1 -1 -3 -2 -2 -7 8 -4 2 -5 6 -2 -1 -5 -2 -5 0 -3 2 1 0 1 5 -3 3 -3 -1 -2 2 -1 1 -5 8 -4 1 -1 1 1 2 -5 2 -6 1 3 1 2 2 -9 2 -4 2 2 1 -4 5 -5 0 -6 -3 -5 -1 -6 0 -5 3 -4 4 -6 4 2 z "
                />
                <path
                  id="구로구"
                  data-name="구로구"
                  className="style"
                  d="M 245 419 l 6 7 4 4 5 2 4 4 4 9 -1 9 2 9 1 6 1 5 3 7 5 5 4 3 -3 5 -4 5 -10 1 -7 -3 -4 -5 -5 -4 -5 -3 -2 0 -2 1 -3 -5 -4 -2 3 -2 0 -1 -3 0 -3 2 -1 -5 -2 -6 -2 1 -1 1 1 1 -4 4 -5 3 -4 5 -4 4 -6 6 -9 2 -2 4 -1 10 -6 0 -8 -1 -5 -4 -4 0 -4 2 -9 0 -5 1 -8 1 2 -4 4 -5 2 -8 2 -5 3 -4 -2 -5 -3 -1 -8 -5 -1 -7 6 -3 4 -6 2 -4 2 -6 5 -6 4 2 4 4 4 5 3 1 5 -1 4 -3 7 -3 4 -4 8 -2 8 1 4 5 6 2 10 2 4 2 1 1 2 -6 1 -8 4 -6 2 -7 z "
                />
                <path
                  id="영등포구"
                  data-name="영등포구"
                  className="style"
                  d="M 249 345 l 5 3 5 4 8 4 8 4 6 6 6 7 5 2 12 0 11 0 6 4 4 -2 4 -1 5 2 5 3 5 4 7 4 6 11 2 8 0 10 -1 5 -11 2 -8 1 -9 1 -8 2 -2 5 -3 8 -2 3 -3 10 -2 8 -9 2 -3 1 -4 7 -4 5 -3 5 -4 6 -4 -3 -5 -5 -3 -7 -1 -5 -1 -6 -2 -9 1 -9 -4 -9 -4 -4 -5 -2 -4 -4 -6 -7 2 -12 3 -4 5 -4 8 -3 0 -2 -2 -2 2 -3 -4 -9 -4 -8 -2 -5 -5 -5 -3 -9 z "
                />
                <path
                  id="동작구"
                  data-name="동작구"
                  className="style"
                  d="M 367 426 l 6 3 5 3 6 5 6 3 3 1 10 4 7 1 -3 4 0 0 4 5 2 8 -2 11 0 6 -1 11 0 8 0 9 -5 -2 -14 0 -3 -2 -5 -4 -6 -10 0 -11 -2 -6 -7 3 -3 1 -2 -2 -7 -3 -9 1 -7 0 -11 -2 -6 -1 -6 7 -6 1 -10 4 -4 3 -2 1 -12 3 4 -6 3 -5 4 -5 4 -7 3 -1 9 -2 2 -8 3 -10 2 -3 3 -8 2 -5 8 -2 9 -1 8 -1 11 -2 z "
                />
                <path
                  id="관악구"
                  data-name="관악구"
                  className="style"
                  d="M 323 470 l 6 1 11 2 7 0 9 -1 7 3 2 2 3 -1 7 -3 2 6 0 11 6 10 5 4 3 2 14 0 5 2 2 8 4 6 3 4 0 11 1 5 -9 4 -7 2 -3 1 -5 4 -5 7 -8 5 -2 7 -1 5 -5 2 -9 2 -9 1 -10 2 -4 2 -2 0 -3 -5 -2 -6 -5 -4 -5 -7 -4 -4 -2 -6 -5 -4 -3 -4 -8 -3 -4 -8 -1 -6 -3 -6 -3 -6 3 -8 -3 -10 -6 -1 -11 1 4 -5 3 -5 12 -3 2 -1 4 -3 10 -4 6 -1 z "
                />
                <path
                  id="금천구"
                  data-name="금천구"
                  className="style"
                  d="M 241 486 l 2 -1 2 0 5 3 5 4 4 5 7 3 10 -1 11 -1 6 1 3 10 -3 8 3 6 3 6 1 6 4 8 8 3 3 4 5 4 2 6 -7 7 -2 5 -3 6 -8 1 -5 4 -4 7 -9 -1 -4 -4 -3 -4 -2 -9 -3 -5 -2 -3 1 -3 -1 -3 -3 -4 -6 -3 -4 -6 -1 -9 -4 -4 -1 -4 2 -2 -2 -3 -3 -5 -4 -6 -2 -4 -4 -9 -3 -8 -1 -4 1 -2 z "
                />
                <path
                  id="양천구"
                  data-name="양천구"
                  className="style"
                  d="M 240 363 l 8 -1 5 5 2 5 4 8 4 9 -2 3 2 2 0 2 -8 3 -5 4 -3 4 -2 12 0 4 -2 7 -4 6 -1 8 -2 6 -1 -1 -4 -2 -10 -2 -6 -2 -4 -5 -8 -1 -8 2 -4 4 -7 3 -4 3 -5 1 -3 -1 -4 -5 -4 -4 -4 -2 -3 -12 2 -9 1 -7 4 -5 0 -4 -4 -4 -4 -6 -2 -11 4 -7 3 -7 5 -2 1 6 5 5 2 6 3 9 3 7 3 4 12 1 7 -2 11 -1 7 -2 1 -8 0 -7 -1 -9 0 -10 2 -8 5 2 5 4 z "
                />
                <path
                  id="강남구"
                  data-name="강남구"
                  className="style"
                  d="M 503 387 l 10 3 4 4 5 3 7 4 7 4 12 5 0 10 0 4 1 13 1 6 1 10 6 2 7 1 6 2 3 2 12 4 5 2 5 3 6 3 5 4 5 5 3 6 3 5 3 5 4 7 2 2 5 10 3 4 4 5 -10 11 -2 6 -4 0 -3 -4 -9 -2 -4 0 0 2 -1 1 -3 3 -11 3 -1 -7 -4 -4 -2 -7 -5 -6 -2 -3 -4 -8 -11 0 -2 2 -5 3 -8 4 -9 2 -6 1 -4 0 -6 2 -3 -5 -7 -13 -4 -9 -1 -3 -5 -5 -6 1 -7 -10 -6 -17 -5 -13 -5 -15 -3 -9 0 -1 -1 -6 -6 -9 -2 3 -1 0 -7 -6 5 -6 4 -5 4 -5 8 -4 12 0 7 0 z "
                />
                <path
                  id="서초구"
                  data-name="서초구"
                  className="style"
                  d="M 460 413 l 1 0 2 -3 6 9 1 6 0 1 3 9 5 15 5 13 6 17 7 10 6 -1 5 5 1 3 4 9 7 13 3 5 6 -2 4 0 6 -1 9 -2 8 -4 5 -3 2 -2 11 0 4 8 2 3 5 6 2 7 4 4 1 7 -5 8 -6 10 0 6 -6 4 -4 4 -5 0 -4 -1 -4 0 -2 6 -2 8 -1 4 -1 2 1 3 -4 0 -10 2 -9 0 -8 0 -7 -4 -4 -6 -5 -5 -4 -2 -5 -4 1 -5 2 -4 -1 -8 0 -5 -2 -4 2 -5 0 -1 -3 -4 -2 -9 -2 -6 -5 0 -2 7 -3 6 -6 4 -8 2 -4 1 -2 0 -6 -3 -3 -3 0 0 -1 -2 -3 -6 -2 -8 -8 -2 -5 3 1 3 0 1 -4 4 -6 3 -4 3 -1 -5 0 -11 -3 -4 -4 -6 -2 -8 0 -9 0 -8 1 -11 0 -6 2 -11 -2 -8 -4 -5 0 0 3 -4 7 -3 5 -8 8 -8 5 -3 5 -4 5 -5 5 -4 3 -4 z "
                />
                <path
                  id="송파구"
                  data-name="송파구"
                  className="style"
                  d="M 621 374 l 6 2 4 2 4 4 0 8 -2 5 -1 3 0 7 5 2 8 5 5 3 8 4 3 2 5 3 5 2 -4 3 0 6 -3 10 4 5 5 3 10 0 9 3 5 5 -1 4 -2 7 -3 9 -4 3 -5 4 -5 5 -2 6 -3 7 -5 5 -10 0 -6 0 0 8 -4 5 -6 -2 -2 -1 -1 4 -4 -5 -3 -4 -5 -10 -2 -2 -4 -7 -3 -5 -3 -5 -3 -6 -5 -5 -5 -4 -6 -3 -5 -3 -5 -2 -12 -4 -3 -2 -6 -2 -7 -1 -6 -2 -1 -10 -1 -6 -1 -13 0 -4 0 -10 6 2 5 1 5 1 5 -1 6 -3 8 -5 3 -2 3 -3 11 -12 5 -4 5 -5 4 -5 z "
                />
                <path
                  id="강동구"
                  data-name="강동구"
                  className="style"
                  d="M 726 320 l 1 7 3 9 0 9 1 9 1 10 1 5 -1 -1 -5 -1 -3 0 -4 2 -11 0 -8 1 -5 6 -4 5 -4 6 -2 4 -1 8 -4 7 -3 2 1 1 -1 2 -6 7 -1 8 -5 -2 -5 -3 -3 -2 -8 -4 -5 -3 -8 -5 -5 -2 0 -7 1 -3 2 -5 0 -8 -4 -4 -4 -2 -6 -2 -7 0 2 -4 2 -5 2 -10 4 -10 1 -1 4 -6 7 -6 5 -3 6 -3 8 -3 4 -1 5 0 11 0 9 -4 7 -5 8 -6 11 -6 11 0 0 7 3 6 z "
                />

                <text id="LCD11110" className="TEXT" x="399" y="282">
                  종로구
                </text>
                <text id="LCD11140" className="TEXT" x="433" y="340">
                  중구
                </text>
                <text id="LCD11170" className="TEXT" x="407" y="395">
                  용산구
                </text>
                <text id="LCD11200" className="TEXT" x="505" y="356">
                  성동구
                </text>
                <text id="LCD11215" className="TEXT" x="577" y="365">
                  광진구
                </text>
                <text id="LCD11230" className="TEXT" x="523" y="297">
                  동대문구
                </text>
                <text id="LCD11260" className="TEXT" x="589" y="270">
                  중랑구
                </text>
                <text id="LCD11290" className="TEXT" x="466" y="258">
                  성북구
                </text>
                <text id="LCD11305" className="TEXT" x="459" y="181">
                  강북구
                </text>
                <text id="LCD11320" className="TEXT" x="494" y="125">
                  도봉구
                </text>
                <text id="LCD11350" className="TEXT" x="560" y="153">
                  노원구
                </text>
                <text id="LCD11380" className="TEXT" x="323" y="218">
                  은평구
                </text>
                <text id="LCD11410" className="TEXT" x="335" y="305">
                  서대문구
                </text>
                <text id="LCD11440" className="TEXT" x="293" y="342">
                  마포구
                </text>
                <text id="LCD11470" className="TEXT" x="209" y="421">
                  양천구
                </text>
                <text id="LCD11500" className="TEXT" x="156" y="334">
                  강서구
                </text>
                <text id="LCD11530" className="TEXT" x="195" y="470">
                  구로구
                </text>
                <text id="LCD11545" className="TEXT" x="279" y="537">
                  금천구
                </text>
                <text id="LCD11560" className="TEXT" x="295" y="413">
                  영등포구
                </text>
                <text id="LCD11590" className="TEXT" x="361" y="455">
                  동작구
                </text>
                <text id="LCD11620" className="TEXT" x="353" y="529">
                  관악구
                </text>
                <text id="LCD11650" className="TEXT" x="481" y="515">
                  서초구
                </text>
                <text id="LCD11680" className="TEXT" x="525" y="464">
                  강남구
                </text>
                <text id="LCD11710" className="TEXT" x="624" y="448">
                  송파구
                </text>
                <text id="LCD11740" className="TEXT" x="675" y="358">
                  강동구
                </text>
              </svg>
            </div>
            <div
              className="overflow-x-hidden mt-2 md:mt-0 w-[100%] h-[50%] mobile:w-[70%] md:w-[50%] md:h-[70%]"
              onClick={handleListclick}
              id="scroll"
            >
              {sessionStorage.list === undefined ? (
                <div className="bg-white w-[100%] h-[100%] flex justify-center items-center">
                  <div>지도를 눌러 문화행사를 확인해보세요</div>
                </div>
              ) : dataList.length === 0 ? (
                <div className="bg-white w-[100%] h-[100%] flex justify-center items-center">
                  <div>문화행사가 없습니다</div>
                </div>
              ) : (
                dataList.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={`${item.GUNAME}/${item.TITLE.charCodeAt(0)}`}
                      state={{
                        codename: item.CODENAME,
                        guname: item.GUNAME,
                        img: item.MAIN_IMG,
                        title: item.TITLE,
                        place: item.PLACE,
                        date: item.DATE,
                      }}
                      data-codename={item.CODENAME}
                    >
                      <div className="hover:cursor-pointer p-5 bg-white m-2 hover:bg-neutral-200">
                        {item.TITLE}
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
