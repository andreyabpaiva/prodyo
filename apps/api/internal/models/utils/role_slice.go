package utils

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type RoleSlice[T ~string] []T

func (r RoleSlice[T]) Value() (driver.Value, error) {
	if r == nil {
		return "[]", nil
	}
	b, err := json.Marshal(r)
	if err != nil {
		return nil, err
	}
	return string(b), nil
}

func (r *RoleSlice[T]) Scan(src any) error {
	if src == nil {
		*r = RoleSlice[T]{}
		return nil
	}
	var raw string
	switch v := src.(type) {
	case string:
		raw = v
	case []byte:
		raw = string(v)
	default:
		return fmt.Errorf("unsupported type for RoleSlice: %T", src)
	}
	return json.Unmarshal([]byte(raw), r)
}
