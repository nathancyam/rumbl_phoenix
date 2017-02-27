defmodule Rumbl.UserTest do
  use Rumbl.ModelCase, async: true
  alias Rumbl.User

  @valid_attrs %{name: "A User", username: "eva", password: "password"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset does not accept longer usernames" do
    attrs = Map.put(@valid_attrs, :username, String.duplicate("a", 30))
    [username: error_msg] = errors_on(%User{}, attrs)
    assert "should be at most 20 character(s)" == error_msg
  end

  test "registration_changeset password must be at least 6 characters long" do
    attrs = Map.put(@valid_attrs, :password, 12345)
    changeset = User.register_changeset %User{}, attrs
    assert {:password, {"is invalid", [type: :string, validation: :cast]}} in changeset.errors
  end

  test "registration_changeset with valid attributes hashes password" do
    attrs = Map.put(@valid_attrs, :password, "asdf123")
    changeset = User.register_changeset %User{}, attrs
    %{password: pass, password_hash: pass_hash} = changeset.changes
    assert changeset.valid?
    refute pass === pass_hash
    assert Comeonin.Bcrypt.checkpw(pass, pass_hash)
  end
end
