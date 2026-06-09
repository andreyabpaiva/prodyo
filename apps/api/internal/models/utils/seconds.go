package utils

import "time"

type Seconds int64

func (s Seconds) Duration() time.Duration {
	return time.Duration(s) * time.Second
}
