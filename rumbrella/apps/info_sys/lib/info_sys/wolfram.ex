defmodule InfoSys.Wolfram do
  import SweetXml
  alias InfoSys.Result

  def start_link(query, query_ref, owner, limit) do
    Task.start_link(__MODULE__, :fetch, [query, query_ref, owner, limit])
  end

  def fetch(query, query_ref, owner, _limit) do
    query
    |> fetch_xml()
    |> xpath(~x"/queryresult/pod[contains(@title, 'Definitions') or contains(@title, 'Result')]/subpod/plaintext/text()")
    |> send_results(query_ref, owner)
  end

  defp send_results(nil, query_ref, owner) do
    send(owner, {:results, query_ref, []})
  end

  defp send_results(result, query_ref, owner) do
    results = [%Result{backend: "wolfram", score: 95, text: to_string(result)}]
    send(owner, {:results, query_ref, results})
  end
  
  defp fetch_xml(query) do
    {:ok, {_, _, body}} = :httpc.request(
      String.to_char_list("http://api.wolframalpha.com/v2/query" <>
        "?appid=#{app_id()}" <>
        "&input=#{URI.encode(query)}" <>
        "&format=plaintext"
      )
    )
    body
  end

  defp app_id, do: Application.get_env(:info_sys, :wolfram)[:app_id]
end