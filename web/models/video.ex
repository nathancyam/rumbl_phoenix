defmodule Rumbl.Video do
  use Rumbl.Web, :model

  @required_fields ~w(url title description)
  @optional_fields ~w(category_id)

  schema "videos" do
    field :url, :string
    field :title, :string
    field :description, :string
    field :slug, :string
    belongs_to :user, Rumbl.User
    belongs_to :category, Rumbl.Category
    has_many :annotations, Rumbl.Annotation

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields)
    |> validate_required([:url, :title, :description])
    |> assoc_constraint(:category)
  end

  defp slugify_title(changeset) do
    if title = get_change(changset, :title) do
      put_change(changeset, :slug, slugify(title))
    else
      changeset
    end
  end

  defp slugify(str) do
  end
end
