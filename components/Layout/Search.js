import React, { useEffect, useState } from "react";
import { List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import mainUrl from "../../utils/mainUrl";
let cancel;

function SearchTab() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);

    if (value.length === 0) return;
    if (value.trim().length === 0) return;

    setText(value);
    setLoading(true);

    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");

      const res = await axios.get(`${mainUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (res.data.length === 0) {
        results.length > 0 && setResults([]);

        return setLoading(false);
      }
      setResults(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (text.length === 0 && loading) setLoading(false);
  }, [text]);

  return (
    <Search
      onBlur={() => {
        results.length > 0 && setResults([]);
        loading && setLoading(false);
        setText("");
      }}
      loading={loading}
      value={text}
      resultRenderer={resultRenderer}
      results={results}
      onSearchChange={handleChange}
      minCharacters={1}
      onResultSelect={(e, data) => Router.push(`/${data.result.username}`)}
    />
  );
}

const resultRenderer = ({ _id, dpLink, name }) => {
  return (
    <List key={_id}>
      <List.Item>
        <Image src={dpLink} alt="ProfilePic" avatar />
        <List.Content header={name} as="a" />
      </List.Item>
    </List>
  );
};

export default SearchTab;
